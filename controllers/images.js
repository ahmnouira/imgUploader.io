var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');


module.exports = {


  // GET request
  index: function(req, res) {
  var viewModel = {
    image:{
      id:1,
      title: 'Sample1',
      description: 'desc1',
      filename: 'sample1.jpg',
      views: 0,
      likes: 0,
      timestamp: Date.now()
    },
    comments:[
      {
        image_id:1,
        email: 'ahmed@gmail.com',
        name: 'test tester',
        gravatar: 'http://lorempixel.com/75/75/animals/10',
        comment:'This is a test comment',
        timestamp: Date.now()

      }, {
        image_id:1,
        email: 'salah@gmail.com',
        name: 'salah',
        gravatar:'http://lorempixel.com/75/75/animals/2',
        comment:'this second comment'
      }
    ]
  };
  sidebar(viewModel, function(viewModel){
    res.render('image', viewModel);

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

      var tempPath = req.file.path;
      var mime_type = req.file.mimetype;
      var ext = '.' + mime_type.split('/')[1]; // get the extension of the uploaded file
      console.log(ext);
      var targetPath = path.resolve('./public/upload/' + imgURL + ext);
      console.log("-->targePath" + targetPath);

      if  ( ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        fs.rename(tempPath, targetPath, function(err) {
          if (err) throw err;
          res.redirect('/images/' + imgURL);
        });

      } else {
        fs.unlink(tempPath, function(err) {
          if (err) throw err;
          res.json(500, {error: 'Only image files are allowed'});
        });
      }


    };

    saveImage();

  },

  like: function(req, res) {
    res.json({likes: 1})
  },
  comment: function(req, res) {
    res.send('The image:comment POST controller');
  }
};
