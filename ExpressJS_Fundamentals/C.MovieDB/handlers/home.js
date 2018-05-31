const htmlReader = require('../utils/htmlReader')
const htmlFile = '../views/home.html'

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    htmlReader.showHtml(res, htmlFile)
  } else {
    return true
  }
}
