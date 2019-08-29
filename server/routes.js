/*This file simply defines the number of 'routes' that the application should respond to*/

  home = require('../controllers/home'),      // search for home.js controller
  images = require('../controllers/images');

module.exports =function(app) {
  app.get('/', home.index);                    // 'home.index' is the controller of '/'
  app.get('/images/:id', images.index);
  app.post('/images', images.create);
  app.post('/images/:id/like', images.like);
  app.post('/images/:id/comment', images.comment);
  app.delete('/images/:id', images.remove);    // DELETE request
  //app.use(router)
};
