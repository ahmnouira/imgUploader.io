var sidebar = require('../helpers/sidebar') // import sidebar module
var ImageModel = require('../models').Image;



module.exports = {
  index: function(req, res) {

    var viewModel = {
      images:[]
    };

    ImageModel.find({}, {}, { sort: {timestamp: -1} }, function(err,images) {
      if (err) { throw err; }
      viewModel.images = images;


    // execute the sidebar module and pass viewModel and basic callback function
    sidebar(viewModel, function(viewModel){
    res.render('index', viewModel);
    });
  });
}



};
