;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  function tabsCallback(){

    var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny):visible').outerHeight() - 1,
        largeButtonHeight   = $('.button.large.dropdown:visible').outerHeight() - 1,
        smallButtonHeight   = $('.button.small.dropdown:visible').outerHeight() - 1,
        tinyButtonHeight    = $('.button.tiny.dropdown:visible').outerHeight() - 1;

    $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul').css('top', normalButtonHeight);
    $('.button.dropdown.large > ul').css('top', largeButtonHeight);
    $('.button.dropdown.small > ul').css('top', smallButtonHeight);
    $('.button.dropdown.tiny > ul').css('top', tinyButtonHeight);

    $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul').css('top', 'auto').css('bottom', normalButtonHeight - 2);
    $('.button.dropdown.up.large > ul').css('top', 'auto').css('bottom', largeButtonHeight - 2);
    $('.button.dropdown.up.small > ul').css('top', 'auto').css('bottom', smallButtonHeight - 2);
    $('.button.dropdown.up.tiny > ul').css('top', 'auto').css('bottom', tinyButtonHeight - 2);

    return $.foundation.customForms.appendCustomMarkup.apply(arguments);
  }

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : tabsCallback}) : null;
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

})(jQuery, this);
