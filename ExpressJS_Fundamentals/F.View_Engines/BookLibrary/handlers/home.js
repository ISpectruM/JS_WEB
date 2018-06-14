const Book = require('../models/book')

let showHomePage = (req, res) => {
  Book.find()
    .then(books => {
      res.render('index', {
        booksCount: books.length
      })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  showHomePage: showHomePage
}
