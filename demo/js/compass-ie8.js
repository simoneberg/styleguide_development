$(document).ready(function() {

  $('.fileupload_btn_label').on('click', function(event) {
    event.preventDefault();
    $(this).next().trigger('click');
  });

});
