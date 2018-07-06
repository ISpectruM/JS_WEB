const Article = require('mongoose').model('Article')

module.exports = {
  index: (req, res) => {
    Article.find({}).populate('edits')
      .then(articles => {
        if(articles.length === 0) {
          return res.render('home/index');
        }
        
        let data = {}
        articles = articles.sort((a, b) => a.creationDate > b.creationDate)
        const lastArticle = articles.filter((a, index) => index === 0)[0]
        let lastThreeArticles = articles.splice(1, 3)

        if (lastArticle.edits) {
          const lastEdit = lastArticle.edits.sort((e1, e2) => e1.creationDate - e2.creationDate)[0]
          let content = lastEdit.content.split(' ')
          if (content.length > 50) {
            content = content.slice(0, 50).join(' ')
          } else {
            content = content.join(' ')
          }
          lastArticle.content = content
        }

        data = {
          lastArticle: lastArticle,
          lastThreeArticles: lastThreeArticles
        }
        res.render('home/index', { data })
      })
  }
}
