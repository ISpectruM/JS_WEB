const homeHandler = require('./home')
const productHandler = require('./product')
const categoryHandler = require('./categoryHandler')

module.exports = {
  home: homeHandler,
  product: productHandler,
  category: categoryHandler
}
