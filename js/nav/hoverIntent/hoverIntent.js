import { rem } from "../../globals";

(function ($) {

	function runHoverIntent() {
		$('.nav--main .menu__item--expanded').hoverIntent({
			interval: 50,
			over: mainmenuOn, 
			timeout: 100, 
			out: mainmenuOff
		});
		
		function mainmenuOn() {
			if(window.innerWidth > rem(64)) {
				$(this).addClass('is-open');
				checkOverflow($(this).find('> .menu'));
			}
		}
		function mainmenuOff() {
			if(window.innerWidth > rem(64)) {
				$(this).removeClass('is-open').find('.is-overflowing').removeClass('is-overflowing');
				$(this).find('.has-overflow').removeClass('has-overflow');
			}
		}
	
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
	}

	const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('.nav--main .menu__item--expanded')) {
      runHoverIntent();
      obs.disconnect(); // Stop observing once initialized
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

})(jQuery);