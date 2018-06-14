const Tag = require('mongoose').model('Tag')
const Image = require('mongoose').model('Image')
const qs = require('querystring')
const url = require('url')
const fs = require('fs')

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', 'utf8', (err, html) => {
      if (err) {
        throw err
      }
      let parsedUrl = url.parse(req.url)
      let queries = qs.parse(parsedUrl.query)
      let searchTags = queries.tagName
      let searchAfterDate = queries.afterDate
      let searchBeforeDate = queries.beforeDate
      let searchLimit = queries.Limit
      let imageIds = []

      if (searchTags) {
        searchTags = searchTags.split(',').filter(e => e.length !== 0)
        // get only images included only in the search tags
        Tag.find({ name: { $in: searchTags } }).then(foundTags => {
          for (const tag of foundTags) {
            for (const imageId of tag.images) {
              if (!imageIds.includes(imageId)) {
                imageIds.push(imageId)
              }
            }
          }
          showImages(imageIds)
        }).catch(err => {
          if (err) {
            res.writeHead(500, {
              'content-type': 'text/plain'
            })
            res.write('500 Server error')
            res.end()
          }
        })
      } else {
        showImages()
      }

      function showImages (images) {
        let dynamicContent = ''
        let searchQuery = {}

        if (images) {
          searchQuery = {_id: {$in: images}}
        }

        Image.find(searchQuery).then(images => {
          if (searchAfterDate) {
            images = images.filter(i => i.creationDate.getTime() > new Date(searchAfterDate).getTime())
          }
          if (searchBeforeDate) {
            images = images.filter(i => i.creationDate.getTime() < new Date(searchBeforeDate).getTime())
          }
          if (searchLimit) {
            images = images.slice(0, parseInt(searchLimit))
          }
          images = images.sort((i1, i2) => i2.creationDate - i1.creationDate)
          for (const image of images) {
            dynamicContent += getDynamicContent(image)
          }
          html = html.replace('<div class="replaceMe"></div>', dynamicContent)
          res.writeHead(200, {
            'content-type': 'text/html'
          })
          res.write(html)
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
      }
    })
  } else {
    return true
  }
}

function getDynamicContent (image) {
  return `<fieldset id="${image.id}>
  <img src="${image.URL}">
  </img><p>${image.description}<p/>
  <button onclick='location.href="/delete?id=${image._id}"' class='deleteBtn'>Delete
  </button> 
  </fieldset>`
}
