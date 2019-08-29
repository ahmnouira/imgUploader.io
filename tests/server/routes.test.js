var home = require('../../controllers/home')
var images = require('../../controllers/images')

var routes = require('../../server/routes')

describe('Routes', function(){

  var app =  {
      get:sinon.spy(),
      post:sinon.spy(),
      delete:sinon.spy()

  };

  beforeEach(function(){
    routes(app);
  });

  describe('GETs', function(){
    it("Should handle: '/'", function() {
      expect(app.get).to.be.calledWith('/', home.index);
    });
    it("Should handle: '/images/:id'", function(){
      expect(app.get).to.be.calledWith('/images/:id', images.index);
    });
  });


  describe('POSTs', function(){
    it("Should handle: '/images'", function(){
    expect(app.post).to.be.calledWith('/images', images.create);
  });
  it("Should handle: '/images/:id/like'", function(){
    expect(app.post).to.be.calledWith('/images/:id/like', images.like);
  });
  it("Should handle: '/images/:id/comment'", function(){
      expect(app.post).to.be.calledWith('/images/:id/comment', images.comment);
  });

});

  describe('DELETs', function(){
    it("Should handle: '/images:id'", function(){
      expect(app.delete).to.be.calledWith('/images/:id', images.remove);
    });
  });


});
