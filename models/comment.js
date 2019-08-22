var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//console.log(ObjectId);
var commentSchema= new Schema({
  image_id: {type:ObjectId},
  image_name: {type:String},
  email: {type:String},
  name: {type:String},
  gravatar:{type:String},
  comment:{type:String},
  timestamp: {type:Date, 'default': Date.now}
});

// virtual properties
commentSchema.virtual('image').set(function(image){
  this._image = image;
}).get(function(){
  return this._image;
});


module.exports = mongoose.model('Comment', commentSchema);
