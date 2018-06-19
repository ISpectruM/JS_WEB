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
  clientInputObj.image = null
  if (req.file) {
    clientInputObj.image = '\\' + req.file.path
  }
  clientInputObj.creator = req.user._id

  Product.create(clientInputObj)
    .then((insertedProduct) => {
      Category.findById(insertedProduct.category)
        .then((category) => {
          category.products.push(insertedProduct._id)
          category.save()
        })
      res.redirect('/?success=' + encodeURIComponent('Product was added successfully!'))
    })
}

module.exports.editGet = (req, res) => {
  let id = req.params.id
  Product.findById(id).then(product => {
    if (!product || product.buyer) {
      res.sendStatus(404)
      return
    }

    if (product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') > -1) {
      Category.find().then((categories) => {
        res.render('product/edit', {
          product: product,
          categories: categories
        })
      })
    } else {
      res.redirect(`/?error=${encodeURIComponent('Not authorised!')}`)
    }
  })
}

module.exports.editPost = (req, res) => {
  let id = req.params.id
  let editedProduct = req.body

  Product.findById(id).then((product) => {
    if (!product || product.buyer) {
      res.redirect(`/?error=${encodeURIComponent('Product was not found')}`)
      return
    }

    if (product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') > -1) {
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
    } else {
      res.redirect(`/?error=${encodeURIComponent('Not authorised!')}`)
    }
  })
}

module.exports.deleteGet = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product || product.buyer) {
      res.redirect(`/?error=${encodeURIComponent('Product was not found')}`)
      return
    }
    if (product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') > -1) {
      res.render('product/delete', { product: product })
    } else {
      res.redirect(`/?error=${encodeURIComponent('Not authorised!')}`)
    }
  })
}

module.exports.deletePost = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product || product.buyer) {
      res.redirect(`/?error=${encodeURIComponent('Product was not found')}`)
      return
    }

    if (product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') > -1) {
      Category.findById(product.category).then(category => {
        if (!category) {
          res.redirect(`/?error=${encodeURIComponent('Category was not found')}`)
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
            console.log('No image to delete')
          }

          Product.deleteOne({ _id: id }, err => {
            if (err) {
              res.sendStatus(500)
              return
            }

            res.redirect(
              `/?success=${encodeURIComponent('Product was deleted successfully!')}`
            )
          })
        })
      })
    } else {
      res.redirect(`/?error=${encodeURIComponent('Not authorised!')}`)
    }
  })
}

module.exports.buyGet = (req, res) => {
  let id = req.params.id

  Product.findById(id).then(product => {
    if (!product || product.buyer) {
      res.redirect(`/?error=${encodeURIComponent('Product was not found')}`)
      return
    }

    res.render('product/buy', { product: product })
  })
}

module.exports.buyPost = (req, res) => {
  let productId = req.params.id

  Product.findById({ _id: productId })
    .then(product => {
      if (product.buyer) {
        let error = `error=${encodeURIComponent('Product was already bought')}`
        res.redirect(`/?${error}`)
        return
      }

      product.buyer = req.user._id
      product.save()
        .then(() => {
          req.user.boughtProducts.push(productId)
          req.user.save()
          res.redirect('/')
        })
    })
}
