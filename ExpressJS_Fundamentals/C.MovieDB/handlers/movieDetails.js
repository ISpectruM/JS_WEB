const utils = require('../utils')
const htmlFile = '../views/details.html'

module.exports = (req, res) => {
  let route = req.pathname
  if (route.startsWith('/movies/details/') && req.method === 'GET') {
    let id = route.substring(route.lastIndexOf('/') + 1)
    let movies = utils.dbReader.getAllSortedByYearDescending()
    let movie = movies[id]

    let detailsTemplate = `<div class="content">
    <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
    <h3>Title ${decodeURIComponent(movie.movieTitle).replace(/\+/g, ' ')}</h3>
    <h3>Year ${decodeURIComponent(movie.movieYear)}</h3>
    <p> ${decodeURIComponent(movie.movieDescription).replace(/\+/g, ' ')}</p>
    </div>`

    utils.htmlReader.showHtml(res, htmlFile, detailsTemplate)
  }
}
