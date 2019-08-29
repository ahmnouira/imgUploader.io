var path = require('path');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define the image schema
var ImageSchema = new Schema({
  title: {type: String},
  description: {type: String},
  filename: {type: String},
  views: {type:Number, 'default': 0},
  likes:  {type:Number, 'default': 0},
  timestamp: {type:Date, 'default': Date.now}
});

// the id if the image is the only the filename without extension
ImageSchema.virtual('id').get(function(){
  return this.filename.replace(path.extname(this.filename), '');
});

// exports the image
module.exports = mongoose.model('Image', ImageSchema);
