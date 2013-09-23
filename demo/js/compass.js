function show_hide_advanced(id) {
  var advanced_panel = document.getElementById(id);
  advanced_arrow = document.getElementById('arrowdown');

  if(advanced_panel.style.display == 'block'){
    advanced_panel.style.display = 'none';
    document.getElementById('arrowdown').innerHTML = '&#xf0dd;';
    advanced_arrow.style.position = 'relative';
    advanced_arrow.style.top = '0px';
  } else {
    advanced_panel.style.display = 'block';
    document.getElementById('arrowdown').innerHTML = '&#xf0de;';
    advanced_arrow.style.position = 'relative';
    advanced_arrow.style.top = '7px';
  }
}

$(document).ready(function(){

  var notifs = $("#user-notifications").text();
  var notifs_exist = true;

  $('#notification_btn').bind('click', function (event) {

    if (notifs_exist == true) {
        $('.notifications-popup').css('left',event.pageX-272); // use pageX and pageY
        $('.notifications-popup').css('top',event.pageY+30);
        $('.notifications-popup').toggle();
        $('#overlay').show();
        $('#overlay').click(function(){
          $('.notifications-popup').hide();
          $('#overlay').hide();
        });

      } else {
        $('.notifications-popup').hide();
        $('#overlay').hide();
      }
    });

  $('.notification .anotification').click (function() {
    $(this).parent().remove();
    notifs = $("#user-notifications").text();
    $("#user-notifications").html(notifs-1);

    if (notifs == 1) {
      notifs_exist = false;
      $('.notification-btn').css('background','#c0c2c1');
      $('.notification-btn').css('border','1px solid #616161');
      $('.notification-btn').css('color','#404040');
      $('.notifications-area').html('You have "0" Notifications');
      $('.notifications-area').css('text-align','center');
      $('.notifications-area').css('padding','10px 0 10px 0');
    }
  });

  //search results advanced
  var userviewright = $(".right-split-container").width();

  $('#table_container').css('width',userviewright-63);  // content area on the right hand side

  $('#filters_applied').click(function(){
    $('.added-filter').toggleClass('glowing');
  });

  $('#search_type_applied').click(function(){
    $('#search_type_drop').toggleClass('glowing');
  });

  $(".action_buttons").click(function () {
    $(this).next().trigger('click');
  });

  $('.panel-header-icons-collapse-up.icon-').click(open_close);

  function open_close() {
    panel_header = $(this).parents('.panel-wrapper').find('.panel-header');
    panel_summary = $(this).parents('.panel-wrapper').find('.panel-summary');
    panel_actions = $(this).parents('.panel-wrapper').find('.panel-action-icons-container');
    panel_content = $(this).parents('.panel-wrapper').find('.panel-content-container-dashboard');

    if ($(panel_content).is(':hidden')) {
      $(this).html('&#xf0de;');
      $(this).css('margin-top','10px');
      panel_header.css('height', '50px');
      panel_actions.css('height', '50px');
      panel_summary.addClass("display-none");
    } else {
      $(this).html('&#xf0dd;');
      $(this).css('margin-top','2px');
      panel_header.css('height', '70px');
      panel_actions.css('height', '70px');
      panel_summary.removeClass("display-none");
    }

    panel_content.slideToggle();

  };

  $('.participant').draggable( { containment: 'document', cursor: 'pointer', zIndex: 10000, opacity: 1.00, revert: 'invalid', helper: 'clone' } );

  $('.participant').bind('drag', function(event, ui) {
    ui.helper.css('background-color', '#e6edf5');
    ui.helper.css('border', 'solid 1px #8b8b8b');
  });

  $('#list-direct-participants').droppable( {
    tolerance: 'pointer', accept: '.participant', drop: function (event, ui) {
      var target = $('#list-direct-participants');
      var source = ui.draggable;
      (target).append(source);
      (source).addClass('direct-participant');
    }
  });

  $('#list-participants').droppable( {
    tolerance: 'pointer', accept: '.direct-participant', drop: function (event, ui) {
      var target = $('#list-participants');
      var source = ui.draggable;
      (source).removeClass('direct-participant');
      (source).addClass('participant');
      (target).append(source);
    }
  });

  $('.participant a.icon-.sr-icon-plus').on('click', function() {
    var target = $('#list-direct-participants');
    var source = $(this).parent();
    (source).removeClass('participant');
    (source).addClass('direct-participant');
    (target).append(source);
  });

  $('.participant a.icon-.sr-icon-x').on('click', function() {
    var target = $('#list-participants');
    var source = $(this).parent();
    (source).removeClass('direct-participant');
    (source).addClass('participant');
    (source).appendTo(target);
  });

  $('#password').on("keyup", function() {
    if ( $(this).val().length === 0 ) {
      $('#save-password').addClass("display-none");
    }
    else {
      $('#save-password').removeClass("display-none");
    }
  });

  $('#activate-subscription').click ( function () {
    $('#activate-subscription-button').addClass("display-none");
    $('#subscription-activated').removeClass("display-none");
  });

  $('#deactivate-subscription').click ( function () {
    $('#activate-subscription-button').removeClass("display-none");
    $('#subscription-activated').addClass("display-none");
  });

  $( 'input:radio[name=radio-group-sub-cycle]' ).change(function() {
    $( '#weekly' ).addClass("display-none");
    $( '#monthly' ).addClass("display-none");

    if($("input:radio[id=radio-weekly]").is(":checked")){
      $( '#weekly' ).removeClass("display-none");
      $( '#monthly' ).addClass("display-none");
    }

    if($("input:radio[id=radio-monthly]").is(":checked")){
      $( '#weekly' ).addClass("display-none");
      $( '#monthly' ).removeClass("display-none");
    }
  });

});
