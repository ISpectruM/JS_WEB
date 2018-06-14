const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
  title: {type: String, required: true},
  imageUrl: {type: String, required: true},
  releaseYear: {type: Number},
  author: {type: String}
})

let Book = mongoose.model('Book', bookSchema)

module.exports = Book
