/* the comments module will return a collection of the newest posted to the site */
/* each comment also  has an  image attached to it so that  thea actual image for each comment can be displayed */

module.exports = {
  newset: function() {
    var comments = [
      {
        id: 1,
        email: 'test@gamil.com',
        name: 'ahmed',
        gravatar: 'http://lorempixel.com/75/75/animals/1',
        comment: 'this is a comment',
        tiemstamp: Date.now(),

        image : {
          id: 1,
          title: 'image title 1',
          description: 'desc 1',
          filename: 'sample1.jpg',
          views: 3,
          likes: 0,
          timestamp: Date.now()
        }

      },{
        id:2,
        email: 'ahmednouira@gmail.com',
        name: 'Ahmed Nouira',
        gravatar: 'http://lorempixel.com/75/75/animals/2',
        comment: 'this comment 2',
        timestamp: Date.now(),

        image: {
          id:1,
          title: 1,
          description: 'desc 2',
          filename: 'sample2.jpg',
          views: 0,
          like: 0,
          timestamp: Date.now()
        }
      }
    ]
    return comments;
  }

};
