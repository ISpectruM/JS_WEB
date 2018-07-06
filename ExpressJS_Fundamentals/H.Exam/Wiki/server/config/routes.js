const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/index.html', controllers.home.index)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/article/create', auth.isAuthenticated, controllers.article.createGet)
  app.post('/article/create', auth.isAuthenticated, controllers.article.createPost)
  app.get('/article/all', controllers.article.viewAll)
  app.get('/article/:id', controllers.article.details)
  app.get('/article/byedit/:id', auth.isAuthenticated, controllers.article.detailsByEdit)
  app.get('/article/history/:id', auth.isAuthenticated, controllers.article.articleHistory)
  app.get('/article/edit/:id', auth.isAuthenticated, controllers.article.editArticleView)
  app.post('/article/edit/:id', auth.isAuthenticated, controllers.article.editArticle)
  app.get('/article/lockArticlce/:id', auth.isInRole('Admin'), controllers.article.lockArticle)
  app.get('/article/unlockArticle/:id', auth.isInRole('Admin'), controllers.article.unlockArticle)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
