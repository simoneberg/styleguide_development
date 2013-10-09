$(document).ready(function() {
  $('#fileupload_btn_label1, #fileupload_btn_label2').on('click', function(event) {
    event.preventDefault();
    $(this).next().trigger('click');
  });
});
