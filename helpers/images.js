/* the images module is responsible for returning various collections of images */

var models = require('../models');

module.exports= {
  popular: function(callback) {
    models.Image.find({}, {}, {limit: 10, sort: {likes: -1}}, function(err, images)  {
      if (err) {throw err;}
      callback(null, images);
    });
  }

};
