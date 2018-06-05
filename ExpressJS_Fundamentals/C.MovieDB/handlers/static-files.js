const fs = require('fs')
const path = require('path')

function getContentType (url) {
  switch (url.substring(url.lastIndexOf('.'))) {
    case '.css':
      return 'text/css'
    case '.ico':
      return 'image/x-icon'
    case '.jpg':
      return 'image/jpg'
    case '.png':
      return 'image/png'
    case '.js':
      return 'application/javascript'
    case 'html':
      return 'text/html'
  }
}

module.exports = (req, res) => {
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(
      path.join(__dirname, `..${req.pathname}`))
    res.writeHead(200, {
      'Content-Type': getContentType(req.pathname)
    })

    const read = fs.createReadStream(filePath)
    read.pipe(read)
  } else {
    return true
  }
}
