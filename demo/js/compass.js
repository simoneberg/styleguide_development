// Show and hide Advanced Search Panel
function show_hide_advanced(id) {
  var advanced_panel = $('#advanced_search');
  var advanced_arrow = $('p.search-arrow').css('position', 'relative');
  
  if (advanced_panel.is(':hidden')) {
    advanced_panel.show();
    advanced_arrow.css("top", "7px").html('&#xf0de;');
  } else {
    advanced_panel.hide();
    advanced_arrow.css("top", "0px").html('&#xf0dd;');
  }
}

$(document).ready(function(){

  // Notification Popup Module
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

  // Expands the footer furtherdown when the Actions button is clicked
  $('.expandable').click(function () {
    $('.content-container').css('padding-bottom','160px');
    $(document).scrollTop( $(this).offset().top );
  });

  // Advanced Search results
  var userviewright = $(".right-split-container").width();

  $('#filters_applied').click(function(){
    $('.added-filter').toggleClass('glowing');
  });

  $('#search_type_applied').click(function(){
    $('#search_type_drop').toggleClass('glowing');
  });

  $(".action_buttons").click(function () {
    $(this).next().trigger('click');
  });

  // Open and Close Panels
  $('.panel-header-icons-collapse-up.icon-').click(open_close);

  function open_close(ev) {
    ev.preventDefault();
    var panelClasses = [".panel-content",".panel-content-container-dashboard",".panel-content-container-full"];
    var hasSelector = $.map(panelClasses,function(c){return "div:has(" + c + ")"}).join(",");

    current_panel = $(this).closest(hasSelector).children(panelClasses.join(",") + ', .panel-footer');
    panel_summary = $(this).parents('.panel-wrapper').find('.panel-summary');
    panel_pagination = $(current_panel).parents('.panel-wrapper').next('.multi-panel-pagination');

    if ($(current_panel).is(':hidden')) {

	  $(this).html('&#xf0de;').removeClass('panel-header-icons-collapse-down');
      panel_summary.addClass("display-none");
      panel_pagination.removeClass("display-none");
	  
    } else {
		
	  $(this).html('&#xf0dd;').addClass('panel-header-icons-collapse-down');
      panel_summary.removeClass("display-none");
      panel_pagination.addClass("display-none");

    }
    current_panel.slideToggle();
  };

  // Assign Direct Participants Relationship
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

  // Save Password
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

  // Show Hide Task Development sections
  $('.show_hide_task_dev').on('click', function(){

    var section = $(this).parents('.add-content-padding').find('.show-and-hide-section');

    if ($(section).is(':hidden'))
    {
      $(this).html('Hide Tasks and Development Activity');
    }
    else
    {
      $(this).html('Show Tasks and Development Activity');
    }

    $(section).toggle();
  });

  // Expand and Collapse Panels on Admin Map
  $('#expandall').on('click', function(){

    var current = $('.panel-header-icons-collapse-up.icon-').closest('div:has(.panel-content-container-dashboard)').children('.panel-content-container-dashboard, .panel-footer');
    var panel_summary = $(current).parents().find('.panel-summary');
	
    if ($(current).is(':hidden')) {
     $(current).show();
     panel_summary.addClass("display-none");
	 $(current).siblings('.panel-header').find('.panel-header-icons-collapse-up.icon-').html('&#xf0de;');
     $(current).siblings('.panel-header').find('.panel-header-icons-collapse-up.icon-').html('&#xf0de;').removeClass('panel-header-icons-collapse-down');
    }
  });

  $('#collapseall').on('click', function(){

    var current = $('.panel-header-icons-collapse-up.icon-').closest('div:has(.panel-content-container-dashboard)').children('.panel-content-container-dashboard, .panel-footer');
    var panel_summary = $(current).parents().find('.panel-summary');

    if ($(current).is(':visible')) {
     $(current).hide();
     panel_summary.removeClass("display-none");
     $(current).siblings('.panel-header').find('.panel-header-icons-collapse-up.icon-').html('&#xf0dd;');
     $(current).siblings('.panel-header').find('.panel-header-icons-collapse-up.icon-').html('&#xf0dd;').addClass('panel-header-icons-collapse-down');
    } 
  }); 
  
  // Add A Competency Control Item to the list
  $('#addcompetency').click (function(ev) {
    ev.preventDefault();
    var n = $("#competency_list li").length;
    var newdescription = "Competence level " + (n+1);

    $('#competency_list li.competence-level-item').eq(0).clone(true).appendTo('#competency_list');
    $("#competency_list li .cl-number").eq(n).html(n+1);
    $("#competency_list li .cl-description span").eq(n).html(newdescription);
    $('#competency_list').sortcompetency();
  });
  
  // Removes Competency Control Items from the list
  $('#competency_list li .cl-icon-x').click(function(ev){
    ev.preventDefault();
    if ($("#competency_list li").length > 1) {
      $(this).parent().parent('li').remove();
      $('#competency_list').sortcompetency();
    }
  });

  // Move Up Competency Control Items from the list
  $('#competency_list li .cl-icon-arrow-up').click(function(ev){
    ev.preventDefault();
    var parent = $(this).parent().parent('li');
    parent.insertBefore(parent.prev());
    $('#competency_list').sortcompetency();
  });

  // Move Down Competency Control Items from the list
  $('#competency_list li .cl-icon-arrow-down').click(function(ev){
    ev.preventDefault();
    var parent = $(this).parent().parent('li');
    parent.insertAfter(parent.next());
    $('#competency_list').sortcompetency();
  });

  // Custom function called by four events - Add, Remove, Move-Up, and Move-Down
  // Hover effect is done in jQuery to ensure compatibilty with IE8 and up
  jQuery.fn.sortcompetency = function(){

    var n = $("#competency_list li").length;

    $('#competency_list li').each(function( index ) {

    if (n >= 2)
    {
      $(this).find('.cl-number').html(index+1);
      if ( $(this).find('.cl-number').html() == 1 || $(this).find('.cl-number').html() == n )
      {
        $(this).find('a.cl-icon-x').removeClass('is-disabled').hover(function(){
          $(this).css("color","#0169a0");},function(){
          $(this).css("color","#858585");});

          if ( $(this).find('.cl-number').html() == 1 )
          {
            $(this).find('a.cl-icon-arrow-up').addClass('is-disabled').hover(function(){
              $(this).css("color","#858585");},function(){
              $(this).css("color","#858585");});

            $(this).find('a.cl-icon-arrow-down').removeClass('is-disabled').hover(function(){
              $(this).css("color","#0169a0");},function(){
              $(this).css("color","#858585");});
          }
          else
          {
            $(this).find('a.cl-icon-arrow-up').removeClass('is-disabled').hover(function(){
              $(this).css("color","#0169a0");},function(){
              $(this).css("color","#858585");});

            $(this).find('a.cl-icon-arrow-down').addClass('is-disabled').hover(function(){
              $(this).css("color","#858585");},function(){
              $(this).css("color","#858585");});
          }
        }
        else
        {
          $(this).find('a.cl-icon-arrow-up').removeClass('is-disabled').hover(function(){
            $(this).css("color","#0169a0");},function(){
            $(this).css("color","#858585");});
          $(this).find('a.cl-icon-arrow-down').removeClass('is-disabled').hover(function(){
            $(this).css("color","#0169a0");},function(){
            $(this).css("color","#858585");});
        }
      }
      else
      {
        $(this).find('.cl-number').html(index+1);
        $(this).find('a.cl-icon-x').addClass('is-disabled').hover(function(){
          $(this).css("color","#858585");},function(){
          $(this).css("color","#858585");});
        $(this).find('a.cl-icon-arrow-up').addClass('is-disabled').hover(function(){
          $(this).css("color","#858585");},function(){
          $(this).css("color","#858585");});
        $(this).find('a.cl-icon-arrow-down').addClass('is-disabled').hover(function(){
          $(this).css("color","#858585");},function(){
          $(this).css("color","#858585");});
      }

    });

  }

  // Function that Cancels Modal Window
  function cancel_modal_window () {
    $('.reveal-modal-bg').trigger('click');
  }

  // Modal Window Cancel Link
  $('.modal-footer a.cancel-link').on('click', cancel_modal_window);

  // Create and Add a New Group to the Organization Structure
  $("a[data-reveal-id='create-group']").on( "click",function() {

    var $this = $(this);
    $('input[data-group-name]').val('');
   
    if ($this.is('#group-action-dropdown')) {
      var target = $('.panel-wrapper.panel-wrapper-group.display-none').children('.panel-content-container-dashboard.panel-content-container-dashboard-group');	 
	  var target_parent_name = 'None';
	}
	else
	{
      var target = $(this).closest('.panel-wrapper.panel-wrapper-group.panel-status-valid').children('.panel-content-container-dashboard.panel-content-container-dashboard-group');
      var target_parent = $(target).closest('.panel-wrapper.panel-wrapper-group.panel-status-valid').children('.panel-header.panel-header-group');	 
      var target_parent_name = $(target_parent).find('.name-classifier').text();
	}

	$('p[data-source-parent]').html(target_parent_name);
	  
    $('.modal-footer a.save-button').one('click', function(ev) {
      ev.preventDefault();
      var new_group = $( ".panel-wrapper.panel-wrapper-group.display-none" ).clone("withDataAndEvents").removeClass("display-none").addClass("panel-status-valid");
      var new_group_name = $('input[data-group-name]').val();

      if ($this.is('#group-action-dropdown') && (new_group_name.length > 0 )) {
        $(target).closest('.content-container').append( new_group );
        new_group.find('.name-classifier').html(new_group_name);
      } else if (new_group_name.length > 0 ) {
		$(target).last().append( new_group );
        new_group.find('.name-classifier').html(new_group_name);
      }

      $('input[data-group-name]').val('');
      cancel_modal_window();

    });

  });

  // Edit Group Name from the Organization Structure
  $("a[data-reveal-id='edit-group-name']").on( "click",function() {

    var target = $(this).closest('.panel-wrapper.panel-wrapper-group.panel-status-valid');
	var target_name = $(target).find('.name-classifier:first').text();
    var new_group_name = $('input[data-edit-group-name]').val(target_name);

    $('.modal-footer a.edit-replace-button').one('click', function(ev) {
      ev.preventDefault();
      $(target).find('h5.name-classifier:first').html(new_group_name.val());
      cancel_modal_window();
    });
	
  });


  // Delete Group from the Organization Structure
  $("a[data-reveal-id='delete-group']").on( "click",function() {

    var target = $(this).closest('.panel-wrapper.panel-wrapper-group.panel-status-valid');
	var target_name = $(target).find('.name-classifier:first').text();

    $('h5[data-group-title]').html('Delete ' + target_name);

    $('.modal-footer a.delete-button').one('click', function(ev) {
      ev.preventDefault();	
      $(target).remove();
      cancel_modal_window();
    });
	
  });


});

/* File upload button stores the file name in data-stored-file */
$('.file-upload-btn .fileupload_btn_label').on('click', function(ev) {
  ev.preventDefault();

  $(this).next().change(function(ev){
    ev.preventDefault();
    var file_name = $(this).val();
	if ( file_name != '' && file_name != null ) {
      $(this).parents('.form-group.file-upload-control').find('.form-group.file-upload-btn .fileupload_btn_label[data-stored-file-name]').val(file_name);
      $(this).parents('.form-group.file-upload-control').find('.file-upload-text-same-line .file-upload-text-links').css('display','inline-block');
      file_name = null;
	}
  });
});

/* File Upload Delete Link clears the file name stored in data-stored-file */
$('a.file-upload-text-links').on('click', function(ev) {
  ev.preventDefault();
  $(this).css('display','none');
  $(this).parents('.form-group.file-upload-control').find('.form-group.file-upload-btn .fileupload_btn_label[data-stored-file-name]').val('');
});

/* Closes the Advanced Search Panel */
function close_advanced_search_panel() {

  var advanced_panel = $('#advanced_search');
  if (advanced_panel.is(':visible')) {
    advanced_panel.hide();
    $('p.search-arrow').css("position", "relative").css("top", "0px").html('&#xf0dd;');
  }
}

/* Adjust row to equal height in Competency Level Control */
function adjust_height_competency_control() {

  var maxHeight = $('.cl-description').height();

  $('.cl-description').each(function(index) {
    if($('.cl-description').eq( index ).height() > maxHeight) {
      maxHeight = $('.cl-description').eq( index ).height();
    }
    index++;
  });
  $('#competency_list .competence-level-number').height(maxHeight);
};

/* Event bound for the Competency Level Control */
$(window).on('load', adjust_height_competency_control);
$(window).on('resize', adjust_height_competency_control);

/* Drop-down closes once a drop-down item is clicked or selected */
$('.button.dropdown.petrocore-actions ul li').on('click', function() {
  $(this).parents('.button.dropdown.petrocore-actions').trigger('click', function(ev) {
    ev.stopPropagation();
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

  $.widget("ps.compassPopover", {
    options:{
      position: {
        my:"left center",
        at:"center center",
        of:".dev-activity"
      },
      content: ".popover-content, .popover-content-right"
    },
    _create : function() {
      var that = this;

      this.popover = this.element.find(this.options.content)
          .appendTo("body");

      this.popover.position($.extend(this.options.position, {of: this.element.find(this.options.position.of)}));
      this.popover.click(function(ev){
        ev.stopPropagation();
      })

      $("body").on("click.popover", function(ev){
        that.popover.is(":visible") && !that.clickedLatch && that.popover.hide();
        that.clickedLatch = false;
      })
      this.element.find(".dev-activity").on('click', $.proxy(this.toggle, this))
    },
    toggle: function(ev){
      this.popover.toggle();
      this.clickedLatch = true;
    },
    _destroy: function() {
      this._off("click")
      return this._super();
    }
  })

})(jQuery);

$(".list-dev-activities").compassPopover();

$(function() {
  $( document ).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
    }
    }
  });
});

(function($){

  $(".toggle-nav-mobile").on("click", function(ev){
    ev.preventDefault();
    $("body").toggleClass("open");
  })

  $(".collapse-menu").on("click", function(ev){
  ev.preventDefault();
  var wrapper = $(".master-wrapper")
  
  wrapper.toggleClass("collapsed");
  close_advanced_search_panel();

  if (wrapper.hasClass("collapsed")) {
      $(".collapse-menu .icon-").html("&#xf0a9;"); // text for arrow left
    return;
  }
    $(".collapse-menu .icon-").html("&#xf0a8;"); // text for arrow left

  $(this).hasClass("icon-search") && $(".search-input :input:first").focus();

  })


})(jQuery);



/* dynamic modal size demo */
$( "#btn-dynamic-modal-small" ).on("click", function() {
  /* the does stuff place */
  console.log("small");
  $( "#dynamic-modal" ).removeClass("small");
  $( "#dynamic-modal" ).addClass("small");
});

$( "#btn-dynamic-modal-medium" ).on("click", function() {
  /* the does stuff place */
  console.log("medium");
  $( "#dynamic-modal" ).removeClass("small");
  $( "#dynamic-modal" ).addClass("medium");
});

$( "#btn-dynamic-modal-large" ).on("click", function() {
  /* the does stuff place */
  console.log("large");
  $( "#dynamic-modal" ).removeClass("small");
  $( "#dynamic-modal" ).addClass("large");
});

$( "#btn-dynamic-modal-xlarge" ).on("click", function() {
  /* the does stuff place */
  console.log("xlarge");
  $( "#dynamic-modal" ).removeClass("small");
  $( "#dynamic-modal" ).addClass("xlarge");
});

$( "#btn-dynamic-modal-expand" ).on("click", function() {
  /* the does stuff place */
  console.log("expand");
  $( "#dynamic-modal" ).removeClass("small");
  $( "#dynamic-modal" ).addClass("expand");
});

$( "a[data-reveal-id='dynamic-modal-small']" ).on("click", function() {
  /* the does stuff place */
  console.log("small");
  $( "#dynamic-modal-small" ).removeClass("small");
  $( "#dynamic-modal-small" ).addClass("small");
});

$( "a[data-reveal-id='dynamic-modal-medium']" ).on("click", function() {
  /* the does stuff place */
  console.log("medium");
  $( "#dynamic-modal-medium" ).removeClass("small");
  $( "#dynamic-modal-medium" ).addClass("medium");
});

$( "a[data-reveal-id='dynamic-modal-large']" ).on("click", function() {
  /* the does stuff place */
  console.log("large");
  $( "#dynamic-modal-large" ).removeClass("small");
  $( "#dynamic-modal-large" ).addClass("large");
});

$( "a[data-reveal-id='dynamic-modal-xlarge']" ).on("click", function() {
  /* the does stuff place */
  console.log("xlarge");
  $( "#dynamic-modal-xlarge" ).removeClass("small");
  $( "#dynamic-modal-xlarge" ).addClass("xlarge");
});

$( "a[data-reveal-id='dynamic-modal-expand']" ).on("click", function() {
  /* the does stuff place */
  console.log("expand");
  $( "#dynamic-modal-expand" ).removeClass("small");
  $( "#dynamic-modal-expand" ).addClass("expand");
});
