const htmlFileLoader = require('../utils/htmlLoader')
const db = require('../config/dataBase')
const qs = require('querystring')
const url = require('url')
const formidable = require('formidable')
const fs = require('fs')
const shortId = require('shortid')
const path = require('path')

function viewAll (req, res) {
  let filePath = './views/viewAll.html'
  let memes = db.getAllSortedByDate()

  let dynamicContent = ''
  for (const meme of memes) {
    dynamicContent += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/></a>          
    </div>`
  }

  htmlFileLoader.view(res, filePath, dynamicContent)
}

function viewAddMeme (req, res) {
  let filePath = './views/addMeme.html'
  htmlFileLoader.view(res, filePath)
}

function addMeme (req, res) {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }

    let file = files.meme
    let tempPath = file.path
    let fileExtension = file.name.substring(file.name.lastIndexOf('.'))
    let newSourcePath = './public/memeStorage/' + shortId.generate() + fileExtension
    let newPath = path.join(__dirname, '.' + newSourcePath)

    let readedFile = fs.createReadStream(tempPath)
    let writeFile = fs.createWriteStream(newPath)
    readedFile.pipe(writeFile)

    let Meme = {
      id: shortId.generate(),
      title: fields.memeTitle,
      memeSrc: newSourcePath,
      description: fields.memeDescription,
      privacy: fields.status,
      dateStamp: Date.now()
    }
    db.add(Meme)
    db.save()
    viewAddMeme(req, res)
  })
}

function getDetails (req, res) {
  let htmlPath = './views/details.html'
  let query = qs.parse(url.parse(req.url).query)

  let targetedMeme = db.getById(query.id)

  let dynamicContent = `<div class="content">
    <img src="${targetedMeme.memeSrc}" alt=""/>
    <h3>Title  ${targetedMeme.title}</h3>
    <p> ${targetedMeme.description}</p>
    <button><a href="${targetedMeme.posterSrc}">Download Meme</a></button>
    </div>`

  htmlFileLoader.view(res, htmlPath, dynamicContent)
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
