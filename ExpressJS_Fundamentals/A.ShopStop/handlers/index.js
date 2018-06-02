const homeHandler = require('./home')
const filesHandler = require('./static-files.js')
const productHandler = require('./product')
const categoryHandler = require('./categoryHandler')

module.exports = [homeHandler, filesHandler, productHandler, categoryHandler]
