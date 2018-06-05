$(document).ready(function(){
  $('.delete-button').on('click', function(e){
    e.preventDefault();
    var queryURL = location.href +'/' + $(this).data('comment');
    $.ajax({
      method:"DELETE",
      url:queryURL
    })
    location.reload();
  })
})