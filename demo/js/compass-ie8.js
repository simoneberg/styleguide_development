$(document).ready(function() {
  $('#fileupload_btn_label1, #fileupload_btn_label2, #fileupload_btn_label3, #fileupload_btn_label4, #fileupload_btn_label5, #fileupload_btn_label6, #fileupload_btn_label7, #fileupload_btn_label8').on('click', function(event) {
    event.preventDefault();
    $(this).next().trigger('click');
  });
});
