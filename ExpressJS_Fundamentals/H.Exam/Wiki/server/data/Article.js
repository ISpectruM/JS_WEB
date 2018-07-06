const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {type: mongoose.SchemaTypes.String, required: true},
  locked: {type: mongoose.SchemaTypes.Boolean, default: false},
  creationDate: {type: Date},
  edits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Edit'}]
}, {
  usePushEach: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
