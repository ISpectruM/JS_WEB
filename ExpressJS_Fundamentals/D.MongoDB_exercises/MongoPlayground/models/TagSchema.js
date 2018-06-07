const mongoose = require('mongoose')

let tagSchema = mongoose.Schema({
  name: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
  images: [{type: mongoose.SchemaTypes.ObjectId}]
})

/* tagSchema.methods.setLowercaseName = function (cb) {
  //let model = this.model('Tag')
  model.name = model.name.toLowercase()
  return model
 } */

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
