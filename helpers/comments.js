/* the comments module will return a collection of the newest posted to the site */
/* each comment also  has an  image attached to it so that  thea actual image for each comment can be displayed */

var models = require('../models');
var async = require('async');


module.exports = {
  newest: function(callback) {
    models.Comment.find({}, {}, {limit: 5, sort:{'timestamp': -1 }},function(err, comments){
      var attachImage = function(comment, next){
        models.Image.findOne({_id: comment.image_id},function(err, image){
          if (err) { throw err; }
            comment.image = image;
            next(err);
          });
      };
      async.each(comments, attachImage, function(err){
        if (err) {throw err;}
        callback(err, comments);

      });
  });

}
};
