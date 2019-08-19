$(document).ready(function(){

/* comment form it will be availabe only when someone clicks on  post comment */
  $('#posts').hide();
  $('#btn-comment').on('click', function(event) {
  event.preventDefault();
  $('#posts').show();
  });


  /* handles the like button */

  $('#btn-like').on('click', function(event){
    event.preventDefault();
    var imgID = $(this).data('id');
    console.log("-->imageID :" + imgID);
    $.post("/images/" + imgID + "/like").done(function(data){
      $('.likes-count').text(data.likes);
    });
  });

});
