var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');
var Models = require('../models');
var md5 = require('MD5');


module.exports = {

 // hander for GET request
  index: function(req, res) {

// declare our empty viewModel variable obeject :
var viewModel = {
  image:{},
  comments : []
};

// find the image by searching the filename matching the url

Models.Image.findOne({filename: {$regex: req.params.id}}, function(err, image){

  if(err) {throw err;}

  if (image){
    // if the image was found, increment its views counter
    image.views += 1;
    // save the image object to the viewModel:
    viewModel.image = image;
    // save the image to database
    image.save();

    // find any comments with the saame id as the image :
    Models.Comment.find({image_id: image._id}, {}, {sort: { 'timestamp': 1 }}, function(err, comments) {

      // save the commments collection to the viewModel
      viewModel.comments = comments;
      // build the sidebar
      sidebar(viewModel, function(viewModel){
          res.render('image', viewModel);
  });
});

} else {
  // if no image was found, redirect to the homepage:
  res.redirect('/');
}
});
},

  create: function(req, res) {

    var saveImage = function() {
      var possible = 'abcdefghijklmnpqrstuvwxyz0123456789';
      var imgURL = '';

     // generate a six-characters random file name
     for (var i = 0; i < 6; i++) {
        imgURL += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      console.log('--> originalname:' + req.file.originalname);
      console.log("--> filePath:" + req.file.path);
      console.log("--> fileName:" + req.file.filename);
      console.log("--> destination folder: " + req.file.destination);
      console.log('--> fieldname: ' + req.file.fieldname);
      console.log('--> mimetype: ' + req.file.mimetype);
      console.log('--> encoding: ' + req.file.encoding);
      console.log('--> size: ' + req.file.size);
      console.log('--> buffer: ' + req.file.buffer);

      // search for an image with the same filename by performing a find:
      Models.Image.find({filename: imgURL}, function(err, images){
        if (images.length>0) {
          // if a matching image was found, try agin
          saveImage();
        } else {


          var tempPath = req.file.path;
          var mime_type = req.file.mimetype;
          var ext = '.' + mime_type.split('/')[1]; // get the extension of the uploaded file
          console.log(ext);
          var targetPath = path.resolve('./public/upload/' + imgURL + ext);
          console.log("-->targePath" + targetPath);
          console.log('------>EXT: ' + path.extname(targetPath))

          if  ( ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            fs.rename(tempPath, targetPath, function(err) {
              if (err) {throw err;}
              /* crate a new Image model  and populate its details */
              var newImg = new Models.Image({
                title: req.body.title,
                description: req.body.description,
                filename: imgURL + ext
              })
              // save the newImg
              newImg.save(function(err, image){
                res.redirect('./images/' + image.id);
              });
            });

      } else {
        fs.unlink(tempPath, function(err) {
          if (err) {throw err;}
          res.json(500, {error: 'Only image files are allowed'});
          });
      } // end of else

};

});// end of Models.Image.find({filename: imgURL}) callback

}
    saveImage();

  },


  like: function(req, res) {
    // add likes support with  database
    Models.Image.findOne({filename :{ $regex: req.params.id}}, function(err, image) {
      if (!err && image) {
        image.likes = image.likes + 1;
        image.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({likes: image.likes});
          }
        });

      }
    })
  },

  comment: function(req, res) {
    Models.Image.findOne({filename: {$regex: req.params.id}}, function(err, image){
      if (!err && image) {
        console.log('--> comment req.body: '); console.log(req.body);
        var newComment  = new Models.Comment(req.body);
        newComment.image_id = image._id;
        newComment.gravatar = md5(newComment.email);
        newComment.image_name = image.filename;
        newComment.save(function(err, comment){
          if (err) {throw err; }
          res.redirect('/images/' + image.id + '#' + comment._id);
        });

      }else {
        res.redirect('/');
      }
    });
  },


// handler DELETE image
  remove: function(req, res) {
    Models.Image.findOne({filename: {$regex: req.params.id}},function(err, image) {
      console.log(image.filename);
      if(err) {throw err;}
      fs.unlink(path.resolve('./public/upload/' + image.filename), function(err){
        if(err){throw err;}
        Models.Comment.deleteMany({image_id: image._id}, function(err){
          image.deleteOne(function(err){
            if(!err){
                res.json(true);
            } else {

              res.json(false);
            }
          });
        });
      });
    });
  }


};
