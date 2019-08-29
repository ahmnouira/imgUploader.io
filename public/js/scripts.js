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
      $('#side-likes').text(data.likes);
    });
  });




  $('#btn-delete').on('click', function(event){
    event.preventDefault();
    $this = $(this);
    console.log($this);
    var remove = confirm('Are sure you want to delete this image ?');
    if (remove) {
      var imgID = $(this).data('id');
      $.ajax({
        url: '/images/' + imgID,
        type: 'DELETE'
      }).done(function(result){
        if (result) {
          $this.removeClass( "btn-danger" ).addClass( "btn-info" );
          $this.find('i').removeClass("fa-times").addClass("fa-check");
          $this.append('<span> Deleted ! </span>');
        }
      });
      }
    });



});
