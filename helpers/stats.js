/* The stats module is going to display a few statistics about our app */
/* count for the total number of images, comments, views, likes */


var models = require('../models');
var async = require('async');




module.exports = function(callback){
  // object Stats
  async.parallel(
    [

      function(next){


          // collections.count is deprecred 
          models.Image.countDocuments({}, next);
        },

      function(next){
          models.Comment.countDocuments({}, next);
        },

      function(next){
          models.Image.aggregate([
            {
              $group: {
                        _id: '1',
                        viewsTotal : {
                          $sum: '$views'
                                      }
                        }


          }]).exec(function(err, result){
              console.log('---> errr :' + err);
              console.log('---> result :' +  result);
                var viewsTotal = 0;
                    if (result.length > 0 ) {
                      viewsTotal += result[0].viewsTotal;
                      }
                        next(null, viewsTotal);
                      });
    },

      function(next){
        models.Image.aggregate([
            {
              $group: {
                  _id: '1',
                  likesTotal: {
                    $sum: '$likes'
                          }
                        }


      }]).exec(function(err, result){
          var likesTotal = 0;
          if (result.length >0 )
          {
            likesTotal += result[0].likesTotal;
          }

          next(null, likesTotal);

        });

      }

      ],function(err, results){
        callback(null, {
          images: results[0],
          comments: results[1],
          views: results[2],
          likes: results[3]
            });
          }
          )
        };
