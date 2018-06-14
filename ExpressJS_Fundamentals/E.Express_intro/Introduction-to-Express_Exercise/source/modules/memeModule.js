const fs = require('fs')
const path = require('path')

const router = require('express').Router()
const shortid = require('shortid')

const memeService = require('../services/memeService')
const genreService = require('../services/genreService')
const uiTemplates = require('../infrastructure/uiTemplates')

let memeGenerator = (title, memeSrc, description, privacy, genreId) => {
  return {
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now(),
    genreId: genreId
  }
}

let fieldChecker = obj => {
  for (let prop in obj) {
    if (obj[prop] === '') {
      return true
    }
  }
}

let viewAll = (req, res, status = null) => {
  memeService
    .getAll()
    .then(data => {
      data = data
        .sort((a, b) => b.dateStamp - a.dateStamp)
        .filter(meme => meme.privacy === 'on')

      let message = getResponseMessage(status)
      res.render('viewAll', {
        memes: data,
        message: message
      })
    })
}

let viewAddMeme = (req, res, status = null) => {
  genreService
    .getAll()
    .then(genres => {
      let message = getResponseMessage(status)

      res.render('addMeme', {
        genres: genres,
        message: message
      })
    })
}

function getResponseMessage (status) {
  switch (status) {
    case 'err':
      return uiTemplates.errorMessage
    case 'sucMeme':
      return uiTemplates.successMemeMessage
    case 'sucGenre':
      return uiTemplates.successGenreMessage
    case 'sucDel':
      return uiTemplates.successDeleteMessage
    case 'errDel':
      return uiTemplates.errorDeleteMessage
    default:
      return ''
  }
}

let getDetails = (req, res) => {
  let targetId = req.params.id
  memeService
    .get(targetId)
    .then(targetedMeme => {
      res.render('details', {meme: targetedMeme})
    })
    .catch(() => {
      res.end('Meme does not exist.')
    })
}

let addMeme = (req, res) => {
  let fileName = shortid.generate() + '.jpg'
  let fields = req.body
  let files = req.files

  memeService
    .getAll()
    .then(allMemes => {
      let dirName = `/public/memeStorage/${Math.ceil(allMemes.length / 10)}`
      let relativeFilePath = dirName + '/' + fileName
      let absoluteDirPath = path.join(__dirname, `../../${dirName}`)
      let absoluteFilePath = absoluteDirPath + '/' + fileName

      fs.access(absoluteDirPath, err => {
        if (err) {
          fs.mkdirSync(absoluteDirPath)
        }

        files.meme.mv(absoluteFilePath, err => {
          if (err) {
            console.log(err)
            viewAddMeme(req, res, 'err')
            return
          }

          if (fieldChecker(fields)) {
            viewAddMeme(req, res, 'err')
          } else {
            let memeForImport = memeGenerator(
              fields.memeTitle,
              relativeFilePath,
              fields.memeDescription,
              fields.status,
              fields.genreSelect
            )

            memeService
              .create(memeForImport)
              .then(() => {
                viewAddMeme(req, res, 'sucMeme')
              })
              .catch(() => {
                viewAddMeme(req, res, 'err')
              })
          }
        })
      })
    })
}

let createGenreView = (req, res, status = null) => {
  let message = getResponseMessage(status)
  res.render('addGenre', { message: message })
}

let createGenre = (req, res) => {
  let fields = req.body

  if (fieldChecker(fields)) {
    createGenreView(req, res, 'err')
  } else {
    let genreObject = {
      title: fields.genreTitle,
      memes: []
    }
    genreService
      .create(genreObject)
      .then(() => {
        createGenreView(req, res, 'sucGenre')
      })
      .catch(() => {
        createGenreView(req, res, 'err')
      })
  }
}

let deleteMemeView = (req, res) => {
  let id = req.params.id

  memeService
    .get(id)
    .then(meme => {
      genreService.get(meme.genreId)
        .then(genre => {
          res.render('deleteMeme', {
            meme: meme,
            genre: genre
          })
        })
    })
    .catch(err => {
      console.log(err)
    })
}

let deleteMeme = (req, res) => {
  let id = req.params.id

  memeService.delete(id).then(err => {
    if (err) {
      viewAll(req, res, 'errDel')
    } else {
      viewAll(req, res, 'sucDel')
    }
  })
}

router
  .get('/viewAllMemes', (req, res) => viewAll(req, res))
  .get('/addMeme', (req, res) => viewAddMeme(req, res))
  .post('/addMeme', (req, res) => addMeme(req, res))
  .get('/getDetails/:id', (req, res) => getDetails(req, res))
  .get('/addGenre', (req, res) => createGenreView(req, res))
  .post('/addGenre', (req, res) => createGenre(req, res))
  .get('/deleteMeme/:id', (req, res) => deleteMemeView(req, res))
  .post('/deleteMeme/:id', (req, res) => deleteMeme(req, res))

module.exports = router
