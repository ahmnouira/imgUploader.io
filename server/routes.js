/* this file defines the routes */

var express = require('express'),
  router = express.Router(),
  home = require('../controllers/home'),    // search for home.js controller
  images = require('../controllers/images');

module.exports =function(app) {
  router.get('/', home.index);  // 'home.index' is the controller of '/'
  router.get('/images/:id', images.index);
  router.post('/images', images.create);
  router.post('/images/:id/like', images.like);
  router.post('/images/:id/comment', images.comment);
  app.use(router);
};
