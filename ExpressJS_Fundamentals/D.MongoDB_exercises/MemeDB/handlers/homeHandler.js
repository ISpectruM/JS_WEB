const htmlFileLoader = require('../utils/htmlLoader')
const filePath = './views/home.html'

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    htmlFileLoader.view(res, filePath)
  } else {
    return true
  }
}
