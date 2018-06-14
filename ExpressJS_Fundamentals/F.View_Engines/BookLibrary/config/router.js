const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.homeHandler.showHomePage)
  app.get('/viewAllBooks', handlers.bookHandler.viewAll)
  app.get('/addBook', handlers.bookHandler.addBookView)
  app.post('/addBook', handlers.bookHandler.addBook)
  app.get('/details/:id', handlers.bookHandler.viewDetails)
}
