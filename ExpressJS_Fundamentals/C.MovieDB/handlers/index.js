const homeHandler = require('./home')
const staticFileHandler = require('./static-files')
const viewAllHandler = require('./allMovies')
const addMovieHandler = require('./addMovie')
const detailsHandler = require('./movieDetails')
const headerHandler = require('./header')

module.exports = [
  headerHandler,
  homeHandler,
  staticFileHandler,
  viewAllHandler,
  addMovieHandler,
  detailsHandler]
