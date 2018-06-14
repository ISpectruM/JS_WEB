const Book = require('../models/book')
const messages = require('../utils/messages')

let viewAll = (req, res) => {
  Book.find({})
    .then(books => {
      books = books.sort((b1, b2) => b1.releaseYear - b2.releaseYear)
      res.render('viewAll', {books})
    })
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
}

let addBookView = (req, res) => {
  res.render('addBook')
}

let addBook = (req, res) => {
  let fields = req.fields
  let newBook = generateBook(fields)
  Book.create(newBook)
    .then(book => {
      res.render('addBook', {
        success: true,
        message: messages.bookAdded
      })
    })
    .catch(err => {
      res.render('addBook', {
        error: err,
        message: messages.fieldsErr
      })
    })
}

let viewDetails = (req, res) => {
  let bookId = req.params.id
  Book.findById(bookId)
    .then(book => {
      res.render('details', {book})
    })
    .catch(err => {
      console.log(err)
    })
}

function generateBook (fields) {
  return {
    title: fields.bookTitle,
    releaseYear: fields.bookYear,
    imageUrl: fields.bookPoster,
    author: fields.bookAuthor
  }
}

module.exports = {
  viewAll,
  addBookView,
  addBook,
  viewDetails
}
