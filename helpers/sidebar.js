var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comments');
var async = require('async');


module.exports = function(viewModel, callback) {
async.parallel([

  function(next){             // for stats
    Stats(next);

  }, function(next){              // for popular images by likes
    Images.popular(next);

  }, function(next){               // the newest comments
    Comments.newest(next);
  }

], function(err, results){
  viewModel.sidebar ={
    stats: results[0],
    popular: results[1],
    comments: results[2]
  };
  callback(viewModel);
});
};
