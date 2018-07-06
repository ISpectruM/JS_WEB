const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars')
const path = require('path')
const config = require('../config/settings')

module.exports = (app) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('view engine', '.hbs')
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'S3cr3t',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
      res.locals.adminRole = req.user.roles.indexOf('Admin') > -1
    }

    next()
  })

  app.use(express.static(path.join(config.development.rootPath, 'static')))

  console.log('Express ready!')
}
