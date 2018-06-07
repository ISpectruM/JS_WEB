const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
  URL: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
  description: {type: mongoose.SchemaTypes.String},
  tags: [{type: mongoose.Schema.Types.ObjectId}]
})

module.exports = mongoose.model('Image', imageSchema)
