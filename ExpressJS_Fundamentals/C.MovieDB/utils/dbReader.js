const db = require('../config/dataBase')

function getAllSortedByYearDescending () {
  return db.sort((movie, nextMovie) => {
    let firstYear = new Date(movie.movieYear)
    let secondYear = new Date(nextMovie.movieYear)
    return secondYear - firstYear
  })
}

function getaLL () {
  return db
}

module.exports = {getAllSortedByYearDescending, getaLL}
