const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/playground'
mongoose.Promise = global.Promise

require('../models/ImageSchema')
require('../models/TagSchema')

module.exports = mongoose.connect(connectionString)
