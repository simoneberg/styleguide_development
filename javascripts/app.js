;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

  // Slide out navigation
  $(function(){
      $(".toggle-btn").click(function(){
          console.log('Clicked');  
          var navLeftMargin = parseInt($(".left-split-container").css("margin-left"));
          console.log('Left margin = ' + navLeftMargin)
          //$('.right-split-container').animate({ width: '75%' }, 'slow');
          //$('.left-split-container').animate({ marginLeft: '0%' }, 'slow');  
          //$('.left-split-container').animate({ width: '25%' }, 'slow');  
          //$('.right-split-container').animate({ width: '100%' }, 'slow');
          
          if (navLeftMargin < 0) {
              $(".right-split-container").animate({
                width: '75%'
              }, { duration: 200, queue: false });
              $(".left-split-container").animate({
                marginLeft: '0%'
              }, { duration: 200, queue: false });
          } else{
              $(".right-split-container").animate({
                width: '100%'
              }, { duration: 200, queue: false });
              $(".left-split-container").animate({
                marginLeft: '-100%'
              }, { duration: 200, queue: false });
          };

      });            
  });

})(jQuery, this);
