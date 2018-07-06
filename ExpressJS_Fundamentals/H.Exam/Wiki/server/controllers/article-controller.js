const Edit = require('mongoose').model('Edit')
const Article = require('mongoose').model('Article')

module.exports = {
  createGet: (req, res) => {
    res.render('article/create')
  },
  createPost: (req, res) => {
    const data = req.body

    let articleData = {
      title: data.title,
      locked: false,
      creationDate: Date.now()
    }
    Article
      .create(articleData)
      .then((article) => {
        let editData = {
          author: req.user.email,
          content: data.content,
          article: article._id
        }

        Edit
          .create(editData)
          .then((edit) => {
            article.edits.push(edit._id)
            article.save()
            res.locals.success = 'Article successfully created!'
            res.redirect('/')
          })
          .catch(err => {
            res.locals.globalError = err
            res.render('article/create')
          })
      })
      .catch(err => {
        res.locals.globalError = err
        res.render('article/create')
      })
  },
  viewAll: (req, res) => {
    Article.find({}).populate('edits')
      .then((articles) => {
        articles = articles.sort((a, b) => a.title < b.title)
        res.render('article/all-articles', { articles })
      })
  },
  details: (req, res) => {
    const articleId = req.params.id
    Article.findById({ _id: articleId }).populate('edits')
      .then(article => {
        // Find the last edit
        const edit = article.edits.sort((e1, e2) => e1.creationDate - e2.creationDate)[0]
        edit.content = `<p> ${edit.content.replace('\r\n\r\n', '</p><p>')} </p>`
        article.currentUser = req.user
        res.render('article/details', { article, edit })
      })
  },
  detailsByEdit: (req, res) => {
    const editId = req.params.id
    Edit.findById({ _id: editId })
      .then(edit => {
        Article.findById({ _id: edit.article })
          .then(article => {
            article.currentUser = req.user
            res.render('article/details', { article, edit })
          })
      })
  },
  articleHistory: (req, res) => {
    let articleId = req.params.id
    Article.findById({ _id: articleId }).populate('edits')
      .then(article => {
        const edits = article.edits.sort((e1, e2) => e2.creationDate > e1.creationDate)
        edits.title = article.title
        res.render('article/history', { edits })
      })
  },
  editArticleView: (req, res) => {
    let id = req.params.id
    Article.findById({ _id: id }).populate('edits')
      .then(article => {
        if (article.locked) {
          res.locals.globalError = 'Article locked for editing!'
          res.render('article/edit')
          return
        }
        let edit = article.edits.sort((e1, e2) => e1.creationDate > e2.creationDate)[0]
        article.content = edit.content
        res.render('article/edit', article)
      })
  },
  editArticle: (req, res) => {
    let id = req.params.id
    let data = req.body
    Article.findById({ _id: id })
      .then(article => {
        if (article.locked) {
          res.locals.globalError = 'Article locked for editing!'
          res.render('article/edit')
          return
        }
        let editData = {
          author: req.user.email,
          content: data.content,
          article: article._id
        }
        Edit
          .create(editData)
          .then((edit) => {
            article.edits.push(edit.id)
            article.save()
            res.locals.success = 'Article successfully edited!'
            res.redirect('/article/details' +9)
          })
          .catch(err => {
            res.locals.globalError = err
            res.render('article/edit')
          })
      })
      .catch(err => {
        res.locals.globalError = err
        res.render('article/edit')
      })
  },
  lockArticle: (req, res) => {
    let id = req.params.id
    Article.findOne({ _id: id })
      .then(article => {
        if (article.locked) {
          res.locals.globalError = 'Article already locked!'
          res.render('article/edit')
          return
        }
        article.locked = true
        article.save()
      })
      .catch(err => {
        res.locals.globalError = err
        res.render('article/edit')
      })
  },
  unlockArticle: (req, res) => {
    let id = req.params.id
    Article.findOne({ _id: id })
      .then(article => {
        if (!article.locked) {
          res.locals.globalError = 'Article already unlocked!'
          res.render('article/edit')
          return
        }
        article.locked = false
        article.save()
      })
      .catch(err => {
        res.locals.globalError = err
        res.render('article/edit')
      })
  }
}
