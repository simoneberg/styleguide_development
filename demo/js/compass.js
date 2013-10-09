function show_hide_advanced(id) {
  var advanced_panel = $('#advanced_search');
  advanced_arrow = $('#arrowdown');
  if (advanced_panel.is(':hidden')) {
    advanced_panel.removeClass("display-none");
    advanced_panel.css("display", "block");
    advanced_arrow.html('&#xf0de;');
    advanced_arrow.css("position", "relative");
    advanced_arrow.css("top", "7px");
  } else {
    advanced_panel.addClass("display-none");
    advanced_panel.css("display", "block");
    advanced_arrow.html('&#xf0dd;');
    advanced_arrow.css("position", "relative");
    advanced_arrow.css("top", "0px");
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

  //Expands the footer when Actions button within the Table is clicked
  $('#report-templates-table .expandable').click(function () {
    $('.panel-wrapper').css('margin-bottom','115px');
    $(document).scrollTop( $("#report-templates-table").offset().top );	
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

  function open_close(ev) {
    ev.preventDefault();
    panel_header  = $(this).parents('.panel-wrapper').find('.panel-header');
    panel_summary = $(this).parents('.panel-wrapper').find('.panel-summary');
    panel_actions = $(this).parents('.panel-wrapper').find('.panel-action-icons-container');
    panel_content = $(this).parents('.panel-wrapper').find('.panel-content-container-dashboard, .panel-content, .panel-footer, .panel-content-container-full');

    if ($(panel_content).is(':hidden')) {
      $(this).html('&#xf0de;').removeClass('panel-header-icons-collapse-down');
      panel_summary.addClass("display-none");
    } else {
      $(this).html('&#xf0dd;').addClass('panel-header-icons-collapse-down');
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

/* prevent hash changes on any nexted tabs*/
$("body").on("click.fndtn", ".tabs-content .tabs a", function(ev){
  ev.preventDefault();
});

/* getting started widget next/prev links */
$("body").on("click", ".js-act-as-tab", function(ev){
  ev.preventDefault();

  var $this = $(this),
      $tab = $(".tabs a[href='" + $this.attr("href") + "']")

  $tab.trigger('click.fndtn');

});

$("body").on("click", ".button.dropdown.js-update-text > ul a", function(ev){
  ev.preventDefault();

  var $selected = $(this),
    text = $selected.text(),
    $button = $selected.parents(".button.dropdown");

  $button.find("> label").text(text);
});


$.widget("ps.gettingStarted", {
  options: {},
  _create : function() {
    this.element.on("click.tabs", '.navigation a', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var $this = $(this),
    $container = $this.parents('.tabs-slides-container'),
    $activeTab = $container.find(".navigation .active"),
    $activeContent = $container.find('.content .active'),
    target = $this.attr('href');

    $activeTab.removeClass('active'); 
    $this.parent().addClass('active')

      $activeContent.fadeOut(function(){
        $container.find(target + 'Tab').fadeIn(function() {
          $activeContent.removeClass('active');
          $(this).addClass('active');
        });
      })

    })

    this.element.on("click.tabs",".js-act-as-tab",function(ev){
      ev.preventDefault();
      ev.stopPropagation();

      var $this = $(this),
          $tab = $(".navigation a[href='" + $this.attr("href") + "']")

      $tab.trigger('click.tabs');
    })
  },
  _destroy: function() {
    this.element.off("click.tabs",".navigation a, .js-act-as-tab");
    return this._super();
  }

})

$('.tabs-slides-container').gettingStarted();


(function($, undefined){

  // trying to reuse the localization from jquery ui 
  var localization = $.datepicker._defaults;

  $.widget("ps.devPlan", {
    options: {
      monthNames: localization.monthNames,
      monthNamesShort: localization.monthNamesShort,
      weekHeader: localization.weekHeader,
      //weekHeader: "Week", /* localization doesn't quite match up */
      nextText: localization.nextText,
      prevText: localization.prevText
    },
    _create : function() {
      this._drawHeader();
    },
    _destroy: function() {
      return this._super();
    }
  })

})(jQuery);

$(".toggle-nav-mobile").on("click", function(ev){
  ev.preventDefault();
  $("body").toggleClass("open");
})

$(".collapse-menu").on("click", function(ev){
  ev.preventDefault();
  var wrapper = $(".master-wrapper")
  
  wrapper.toggleClass("collapsed");

  if (wrapper.hasClass("collapsed")) {
    $(this).find(".icon-").html("&#xf0a9;"); // text for arrow left
    return;
  }
  $(this).find(".icon-").html("&#xf0a8;"); // text for arrow left

  $(this).hasClass("icon-search") && $(".search-input :input:first").focus();

})
