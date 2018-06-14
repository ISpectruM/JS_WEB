const mongoose = require('mongoose')
const config = require('../config/config')
mongoose.Promise = global.Promise

module.exports = new Promise((resolve, reject) => {
  mongoose.connect(config.connectionString)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      console.log(err)
      return
    }

    console.log('Successfully connected to DB')
    resolve()
  })

  db.on('error', (err) => {
    console.log(err)
    reject(err)
  })
})
