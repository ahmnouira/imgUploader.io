var sidebar = require('../helpers/sidebar') // import sidebar module



var viewModel = {
  images:[
    {
    id: 1,
    title : 'Sample image 1',
    description: 'desc 1',
    filename: 'sample1.jpg',
    views: 0,
    likes: 0,
    timestamp: Date.now
  },
    {
      id:2,
      title :'Sample image 2',
      description: 'desc 2',
      filename: 'sample2.jpg',
      views: 0,
      likes: 0,
      timestamp: Date.now
  }
  ]
}


module.exports = {
  index: function(req, res) {
    // execute the sidebar module and pass viewModel and basic callback function
    sidebar(viewModel, function(viewModel){
    res.render('index', viewModel);
  });
}
}
