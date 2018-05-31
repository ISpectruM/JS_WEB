const htmlReader = require('../utils/htmlReader')
const route = '/addMovie'
const db = require('../config/dataBase')
const qs = require('querystring')
const file = '../views/addMovie.html'
const errorMessage = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'

const successMessage = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>'

module.exports = (req, res) => {
  if (req.pathname === route && req.method === 'GET') {
    htmlReader.showHtml(res, file)
  } else if (req.pathname === route && req.method === 'POST') {
    let body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()

      let movie = qs.parse(body)

      if (!movie.movieTitle || !movie.moviePoster) {
        htmlReader.showHtml(res, file, errorMessage)
        return
      }

      db.push(movie)
      htmlReader.showHtml(res, file, successMessage)
    })
  } else {
    return true
  }
}
