const formidable = require('formidable')
const Tag = require('mongoose').model('Tag')

function addTag (req, res) {
  let form = formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    const name = fields.tagName
    Tag.create({
      name,
      images: []
    }).then(tag => {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
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

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    addTag(req, res)
  } else {
    return true
  }
}
