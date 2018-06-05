let fs = require('fs')

function view (res, filePath, dynamicContent) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.write('404 not found')
      res.end()
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    if (dynamicContent) {
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dynamicContent)
    }

    res.write(data)
    res.end()
  })
}

module.exports = {view}
