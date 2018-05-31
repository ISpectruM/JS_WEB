const http = require('http')
const port = 3000
const handlers = require('./handlers')
const url = require('url')

http.createServer((req, res) => {
  // req.headers.StatusHeader = 'Full'
  req.pathname = req.url || url.parse(req.url).pathname
  for (const handler of handlers) {
    if (!handler(req, res)) {
      break
    }
  }
}).listen(port)
