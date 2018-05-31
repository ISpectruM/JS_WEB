const htmlReader = require('../utils/htmlReader')
const htmlFile = '../views/viewAll.html'
const dbReader = require('../utils/dbReader')

/**
 *
 * @param {http.ClientRequest} req
 * @param {http.ClientResponse} res
 */
module.exports = (req, res) => {
  if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
    let movies = dbReader.getAllSortedByYearDescending()
    let moviesResult = ''
    for (let i = 0; i < movies.length; i++) {
      moviesResult += `<div class="movie">
        <img class="moviePoster" src="${decodeURIComponent(movies[i].moviePoster)}"/>
        <a href="/movies/details/${i}">Details</a>          
      </div>`
    }

    htmlReader.showHtml(res, htmlFile, moviesResult)
  } else {
    return true
  }
}
