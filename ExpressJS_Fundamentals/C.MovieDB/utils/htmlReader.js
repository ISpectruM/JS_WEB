const fs = require('fs')
const path = require('path')
const replaceTemplate = '<div id="replaceMe">{{replaceMe}}</div>'

function showHtml (res, file, dynamicHtml) {
  let filePath = path.normalize(
    path.join(__dirname, `${file}`)
  )

  fs.readFile(filePath, (err, data) => {
    checkForErr(err, res)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    if (dynamicHtml) {
      data = data.toString().replace(replaceTemplate, dynamicHtml)
    }

    res.write(data)
    res.end()
  })
}

function checkForErr (err, res) {
  if (err) {
    console.log(err)
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })

    res.write('404 not found!')
    res.end()
  }
}

module.exports = {showHtml}
