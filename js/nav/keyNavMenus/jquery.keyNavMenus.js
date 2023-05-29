(function ($) {
  /*
  *	function keyNavMenus - provides a method to setup mutliple
  * keyboard based navigation keys on any menu by providing
  * keycodes to the options object of the function. Keycodes can
  * be either a single integer or an array of integers. Shift+Tab
  * always closes menus and focuses parent.
  *
  * Sample: $('#menu a').keyNavMenus()
  */

  function checkOverflow(element) {
    var $element = $(element);
    var left_element = $element.offset().left + $element.outerWidth();
    var viewport_width = $(window).width();
    
    if (left_element > viewport_width) {
      $element.addClass('is-overflowing');
      if($element.siblings('.menu__item-link-wrapper').find('> .submenu-trigger').length) {
				$element.siblings('.menu__item-link-wrapper').addClass('has-overflow');
			}
    } else {
      $element.removeClass('is-overflowing');
      if($element.siblings('.menu__item-link-wrapper').find('> .submenu-trigger').length) {
				$element.siblings('.menu__item-link-wrapper').removeClass('has-overflow');
			}
    }
  }

  $.fn.keyNavMenus = function( options ) {
    var settings = $.extend({
      // These are the defaults.
      open: 40, // DOWN
      close: 38, // UP
      next: 39, // RIGHT
      prev: 37, // LEFT
      click: [ 32, 13 ], // SPACE / ENTER
      menuSelector: '.menu',
      menuItemSelector: '.menu__item',
      menuLinkWrapperSelector: '.menu__item-link-wrapper',
      menuLinkSelector: 'a',
      triggerSelector: '.submenu-trigger',
      openClass: 'is-open', // Match class used for hoverIntent
      tabClose: true,
      singleLevel: false
    }, options );
    
    return this.each( function() {
      // Store a copy of $( this )
      var $this = $( this );
      
      $this.bind('keydown', function (event) {
        var key = event.which;
        // VARIOUS CHECKS AGAINST MAPPED KEYS FOR ACTIONS
        if ($.inArray(key, settings.open) != -1 || key === settings.open) {
          event.preventDefault();
          keyNavSectionOpen( $this );
        }
        if ($.inArray(key, settings.close) != -1 || key === settings.close) {
          event.preventDefault();
          keyNavSectionClose( $this );
        }
        if ($.inArray(key, settings.next) != -1 || key === settings.next) {
          event.preventDefault();
          keyNavItemNext( $this );
        }
        if ($.inArray(key, settings.prev) != -1 || key === settings.prev) {
          event.preventDefault();
          keyNavItemPrev( $this );
        }
        if ($.inArray(key, settings.click) != -1 || key === settings.click) {
          event.preventDefault();
          keyNavItemClick( $this );
        }
        // DEFAULT TO CLOSE WITH SHIFT+TAB
        if (event.shiftKey && event.which === 9 && settings.tabClose) {
          keyNavSectionClose( $this );
        }
      });
    });
    
    /*
    *	function keyNavSectionClose - Closes the parent section menu of the
    * element that the function is called on. Can be used just like any
    * other jQuery function, if no menu is found nothing happens.
    */
    function keyNavSectionClose( element ) {
      return element.each(function () {
        if(settings.singleLevel == false) {
          if(element.parent(settings.menuLinkWrapperSelector).siblings(settings.menuSelector).length) {
            if(element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).parent('.menu--level-0').length) {
              element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).removeClass(settings.openClass).show();
            } else {
              element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).removeClass(settings.openClass);
            }
            element.siblings(settings.triggerClass).attr('aria-expanded',false).attr('aria-label',function(index,attr){
              return attr.replace('Close the','Open the');
            });
          } else if(element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).parent('nav').length < 1 || (element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).parent('nav').length == 1 && element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).parent(settings.menuItemSelector).parent('.menu--level-0').length < 1)) {
            element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).removeClass(settings.openClass).parent(settings.menuSelector).siblings(settings.menuLinkWrapperSelector).find('> '+settings.menuLinkSelector).focus().siblings(settings.triggerClass).attr('aria-expanded',false).attr('aria-label',function(index,attr){
              return attr.replace('Close the','Open the');
            });
          }
          element.parent(settings.menuLinkWrapperSelector).siblings(settings.menuSelector).removeClass('is-overflowing');
        }
        if ( ($(this).closest(settings.menuItemSelector).is(':first-child')) && ( $(this).parentsUntil('nav').length > 3) ) {
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).parent(settings.menuSelector).siblings(settings.menuLinkWrapperSelector).removeClass(settings.openClass).find('> '+settings.menuLinkSelector).focus().siblings(settings.triggerClass).attr('aria-expanded',false).attr('aria-label',function(index,attr){
            return attr.replace('Close the','Open the');
          });
        };
      });
    }
    
    /*
    *	function keyNavSectionOpen - Opens the parent section menu of the
    * element that the function is called on. Can be used just like any
    * other jQuery function, if no menu is found nothing happens.
    */
    function keyNavSectionOpen( element ) {
      return element.each(function () {
        if(settings.singleLevel == false && element.parent(settings.menuLinkWrapperSelector).siblings(settings.menuSelector).length) {
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).addClass(settings.openClass).find('> '+settings.menuSelector).find('> '+settings.menuItemSelector+':first-child > '+settings.menuLinkWrapperSelector+' '+settings.menuLinkSelector).focus();
          element.siblings(settings.triggerClass).attr('aria-expanded',true).attr('aria-label',function(index,attr){
            return attr.replace('Open the','Close the');
          });
          checkOverflow(element.parent(settings.menuLinkWrapperSelector).siblings(settings.menuSelector));
        }
      });
    }
    
    /*
    *	function keyNavItemNext - Closes the parent section menu of the
    * element that the function is called on. Can be used just like any
    * other jQuery function, if no menu is found nothing happens.
    */
    function keyNavItemNext( element ) {
      return element.each(function () {
        if(settings.singleLevel == false) {
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).next().find('> '+settings.menuLinkWrapperSelector).find(settings.menuLinkSelector).focus();
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).removeClass(settings.openClass).find(settings.triggerSelector).attr('aria-expanded',false).attr('aria-label',function(index,attr){
            return attr.replace('Close the','Open the');
          });
          if(element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).find(settings.triggerSelector).length) {
            element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).find(settings.triggerSelector).attr('aria-expanded',false).attr('aria-label',function(index,attr){
              return attr.replace('Close the','Open the');
            });
          }
        } else if(settings.singleLevel == true) {
          element.parent(settings.menuItemSelector).next().find('> '+settings.menuLinkSelector).focus();
        }
      });
    }
    
    /*
    *	function keyNavItemPrev - Closes the parent section menu of the
    * element that the function is called on. Can be used just like any
    * other jQuery function, if no menu is found nothing happens.
    */
    function keyNavItemPrev( element ) {
      return element.each(function () {
        if(settings.singleLevel == false) {
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).prev().find('> '+settings.menuLinkWrapperSelector).find(settings.menuLinkSelector).focus();
          element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).removeClass(settings.openClass).find(settings.triggerSelector).attr('aria-expanded',false).attr('aria-label',function(index,attr){
            return attr.replace('Close the','Open the');
          });
          if(element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).find(settings.triggerSelector).length) {
            element.parent(settings.menuLinkWrapperSelector).parent(settings.menuItemSelector).find(settings.triggerSelector).attr('aria-expanded',false).attr('aria-label',function(index,attr){
              return attr.replace('Close the','Open the');
            });
          }
        } else if(settings.singleLevel == true) {
          element.parent(settings.menuItemSelector).prev().find('> '+settings.menuLinkSelector).focus();
        }
      });
    }
    
    /*
    *	function keyNavItemClick - Performs the click event on whatever
    * element that the function is called on. Can be used just like any
    * other jQuery function, if no menu is found nothing happens.
    */
    function keyNavItemClick( element ) {
      return element.each(function () {
        this.click();
      });
    }
  }
}(jQuery));