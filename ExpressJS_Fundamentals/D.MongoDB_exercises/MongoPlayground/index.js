const http = require('http')
const url = require('url')
const qs = require('querystring')
const port = process.env.PORT || 5000
const handlers = require('./handlers/handlerBlender')

require('./config/db').then(() => {
  console.log('Connected to DB')

  http
    .createServer((req, res) => {
      req.pathname = url.parse(req.url).pathname
      req.pathquery = qs.parse(url.parse(req.url).query)
      for (let handler of handlers) {
        if (!handler(req, res)) {
          break
        }
      }
    })
    .listen(port, () => {
      console.log(`Listening on port ${port}...`)
    })
}).catch(err => {
  throw err
})
