const htmlFile = '../views/status.html'
const utils = require('../utils')

module.exports = (req, res) => {
  let headers = req.headers
  if (headers.hasOwnProperty('StatusHeader') && headers['StatusHeader'] === 'Full') {
    let moviesCount = utils.dbReader.getaLL().length
    utils.htmlReader.showHtml(res, htmlFile, moviesCount)
  } else {
    return true
  }
}
