const router = require('express').Router()
const shortid = require('shortId')
const path = require('path')
const fs = require('fs')
const memeModule = require('../modules/memeModule')

const memeService = require('../services/memeService')

const deleteMeme = (req, res) => {
  let memeId = req.params.id
  memeService
    .delete(memeId)
    .then(() => {
      res.json({ location: '/memes/viewAllMemes' })
    })
    .catch(err => {
      console.log(err)
      res.json({ err: err })
    })
}

const getAll = (req, res) => {
  memeService
    .getAll()
    .then(memes => {
      res.json(memes)
    })
    .catch(err => {
      console.log(err)
      res.json({ err: err })
    })
}

const getMemeById = (req, res) => {
  let id = req.params.id
  memeService.get(id).then(meme => {
    res.json(meme)
  })
    .then(err => {
      console.log(err)
      res.json({ err: err })
    })
}

/* const addMeme = (req, res) => {
  let formData = req.body

  let fileName = shortid.generate() + '.jpg'
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
            memeModule.viewAddMeme(req, res, 'err')
            return
          }

          if (memeModule.fieldChecker(formData)) {
            memeModule.viewAddMeme(req, res, 'err')
          } else {
            let newObject = JSON.parse(formData)
            memeService
              .create(newObject)
              .then(() => {
                memeModule.viewAddMeme(req, res, 'suc')
              })
              .catch(() => {
                memeModule.viewAddMeme(req, res, 'err')
              })
          }
        })
      })
    })
} */

router
  .get('/memes/delete/:id', (req, res) => deleteMeme(req, res))
  .post('/memes/delete/:id', (req, res) => deleteMeme(req, res))
  .get('/memes', (req, res) => getAll(req, res))
  .get('/memes/:id', (req, res) => getMemeById(req, res))
/* .get('/memes/add', (req, res) => addMeme(req, res))
  .post('/memes/add', (req, res) => addMeme(req, res)) */

module.exports = router
