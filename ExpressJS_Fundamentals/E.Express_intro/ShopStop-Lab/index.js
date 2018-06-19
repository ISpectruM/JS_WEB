
const port = 3000
const express = require('express')
const config = require('./config/config')
const databaseConfig = require('./config/database.config')

let app = express()
let environment = process.env.NODE_ENV || 'development'

databaseConfig(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)
require('./config/passport')()

app.listen(port)
console.log(`Listen on port ${port}`)
