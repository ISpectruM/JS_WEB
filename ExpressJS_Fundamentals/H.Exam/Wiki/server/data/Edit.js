const mongoose = require('mongoose')

const editSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date, default: Date.now
  },
  content: {type: String, required: true},
  article: {type: mongoose.SchemaTypes.ObjectId, ref: 'Article'}
})

const Edit = mongoose.model('Edit', editSchema)

module.exports = Edit
