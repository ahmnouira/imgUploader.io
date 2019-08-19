/* the images module is responsible for returning various collections of images */

module.exports= {
  popular: function() {
    var images = [
      {
        id: 1,
        title: 'sample image 1',
        description: 'desc 1',
        filename: 'sample1.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now()
      }, {
        id: 2,
        title: 'sample image 2',
        description: 'desc 2',
        filename: 'sample2.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now()
      }
    ];
    return images;
  }
};
