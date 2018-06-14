const path = require('path')
const handlebars = require('express-handlebars')
const formidable = require('express-formidable')

module.exports = (app, express) => {
  // let viewPath = path.join(__dirname, '/views')
  const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'baseLayout'
    // partialsDir: viewPath + '/partials'
  })

  app.engine('.hbs', hbs.engine)
  app.set('view engine', '.hbs')

  app.use('/static', express.static(path.join(__dirname, '../static')))
  app.use(formidable())
}
