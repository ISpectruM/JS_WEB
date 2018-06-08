const fs = require('fs')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  Category.find().then((categories) => {
    res.render('product/add', { categories: categories })
  })
}

module.exports.addPost = (req, res) => {
  let clientInputObj = req.body
  clientInputObj.image = '\\' + req.file.path

  Product.create(clientInputObj).then((insertedProduct) => {
    Category.findById(insertedProduct.category).then((category) => {
      category.products.push(insertedProduct._id)
      category.save()
    })
    res.redirect('/')
  })
}

module.exports.editGet = (req, res) => {
  let id = req.params.id
  Product.findById(id).then(product => {
    if (!product) {
      res.sendStatus(404)
      return
    }

    Category.find().then((categories) => {
      res.render('product/edit', {
        product: product,
        categories: categories
      })
    })
  })
}

module.exports.editPost = (req, res) => {
  let id = req.params.id
  let editedProduct = req.body

  Product.findById(id).then((product) => {
    if (!product) {
      res.redirect(`/?error=${encodeURIComponent('error=Product was not found')}`)
      return
    }

    product.name = editedProduct.name
    product.description = editedProduct.description
    product.price = editedProduct.price

    if (req.file) {
      product.image = '\\' + req.file.path
    }

    if (product.category.toString() !== editedProduct.category) {
      Category.findById(product.category).then((currentCategory) => {
        Category.findById(editedProduct.category).then((newCategory) => {
          let index = currentCategory.products.indexOf(product._id)
          if (index >= 0) {
            currentCategory.products.splice(index, 1)
          }
          currentCategory.save()

          newCategory.products.push(product._id)
          newCategory.save()

          product.category = editedProduct.category

          product.save().then(() => {
            res.redirect(
              '/?success=' + encodeURIComponent('Product was edited successfully!')
            )
          })
        })
      })
    } else {
      product.save().then(() => {
        res.redirect(
          '/?success=' + encodeURIComponent('Product was edited successfully!')
        )
      })
    }
  })
}

module.exports.deleteGet = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product) {
      res.redirect(`/?error=${encodeURIComponent('error=Product was not found')}`)
      return
    }

    res.render('product/delete', { product: product })
  })
}

module.exports.deletePost = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product) {
      res.redirect(`/?error=${encodeURIComponent('error=Product was not found')}`)
      return
    }

    Category.findById(product.category).then(category => {
      if (!category) {
        res.redirect(`/?error=${encodeURIComponent('error=Category was not found')}`)
        return
      }
      let index = category.products.indexOf(product._id)
      if (index >= 0) {
        category.products.splice(index, 1)
      }
      category.save()

      let imagePath = '.' + product.image
      fs.unlink(imagePath, err => {
        if (err) {
          res.sendStatus(500)
          return
        }

        Product.deleteOne({ _id: id }, err => {
          if (err) {
            res.sendStatus(500)
            return
          }

          res.render(
            '/?success=' + encodeURIComponent('Product was deleted successfully!')
          )
        })
      })
    })
  })
}

module.exports.buyGet = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product) {
      res.redirect(`/?error=${encodeURIComponent('error=Product was not found')}`)
      return
    }

    res.render('product/buy', {product: product})
  })
}
