const fs = require('fs')

let db = []
let dbPath = './db/db.json'

let load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('loading')
      db = JSON.parse(data)
      resolve()
    })
  })
}

let save = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        console.log(err)
        return
      }
      resolve()
    })
  })
}

let add = (meme) => {
  db.push(meme)
}

let dbCopy = () => {
  return db.slice(0)
}

let getAllSortedByDate = () => {
  return db.sort((m1, m2) => m1.dateStamp - m2.dateStamp)
}

let getById = (id) => {
  return db.find((el) => { return el.id === id })
}

module.exports = {
  load: load,
  save: save,
  getDb: dbCopy,
  add: add,
  getById: getById,
  getAllSortedByDate: getAllSortedByDate
}
