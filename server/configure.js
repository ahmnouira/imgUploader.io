var path = require('path'),
  express = require('express')
  routes= require('./routes'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  errorhandler =require('errorhandler'),
  moment = require('moment'),
  multer = require('multer'),
  upload = multer({ dest: path.join(__dirname,'public/upload/temp' ) });

  module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':true}));
    app.use(upload.single('file')); // 'file' must be the same as <form name="file"> in Views

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret'));

    app.use('/public/', express.static(path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {
      app.use(errorhandler());
    }

    app.engine('handlebars', exphbs.create({
      defaultLayout: 'main',
      layoutDir: app.get('veiws') +  '/layouts',
      partialsDir: [app.get('views') + '/partials'],
      helpers: {
        timeago: function(timestamp) {
          return moment(timestamp).startOf('minute').fromNow();
        }
      }
    }).engine);

    app.set('view engine', 'handlebars');
    routes(app);
    return app;


  };
