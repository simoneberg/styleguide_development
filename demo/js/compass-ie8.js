$(document).ready(function() {

  $('.fileupload_btn_label').on('click', function(event) {
    event.preventDefault();
    $(this).next().trigger('click');
  });

  //add the border to the bottom of the last item in the generic list
  // ie8 does not recognize the css3 :last-child pseudoclass
  $( '.list .list-item:last-child').css("border-bottom", "solid 1px #929292");
});
