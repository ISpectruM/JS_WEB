const express = require('express')

const app = express()
const port = 3030

require('./config/express')(app, express)
require('./config/router')(app)

require('./config/database_config')
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('Could not conect to DB', err)
  })
