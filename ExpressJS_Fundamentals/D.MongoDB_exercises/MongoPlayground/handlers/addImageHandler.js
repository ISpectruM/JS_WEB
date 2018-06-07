const Image = require('mongoose').model('Image')
const formidable = require('formidable')
const Tag = require('mongoose').model('Tag')
const ObjectId = require('mongoose').Types.ObjectId
const url = require('url')
const qs = require('querystring')

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function deleteImg (req, res) {
  let imageId = qs.parse(url.parse(req.url).query)
  Image.remove({ _id: imageId.id })
  res.writeHead(302, {
    'Location': '/'
  })
  res.end()
}

function addImage (req, res) {
  const form = formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    let tags = fields.tagsId.split(',').reduce((p, c, i, a) => {
      if (p.includes(c) || c.length === 0) {
        return p
      } else {
        p.push(c)
        return p
      }
    }, []).map(ObjectId)

    let image = {
      URL: fields.imageUrl,
      description: fields.description,
      tags
    }

    Image.create(image).then((createdImage) => {
      for (const tag of createdImage.tags) {
        Tag.findById(tag).then((foundTag) => {
          foundTag.images.push(createdImage._id)
          foundTag.save()
          res.writeHead(302, {
            'location': '/'
          })
          res.end()
        })
      }
    }).catch(err => {
      if (err) {
        res.writeHead(500, {
          'content-type': 'text/plain'
        })
        res.write('500 Server error')
        res.end()
      }
    })
  })
}
