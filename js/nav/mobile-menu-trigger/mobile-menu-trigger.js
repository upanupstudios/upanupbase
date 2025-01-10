import { rem } from "../../globals";

(function($){

	function openActiveTrail() {
		$('.nav--main .menu__item--active-trail').each(function(){
			$(this).addClass('is-open').find('> .menu__item-link-wrapper > .submenu-trigger').attr('aria-expanded',true).attr('aria-label',function(index,attr){
				return attr.replace('Open the','Close the');
			});
		});
	}
	function closeActiveTrail() {
		$('.nav--main .is-open').each(function(){
			$(this).removeClass('is-open').find('> .menu__item-link-wrapper > .submenu-trigger').attr('aria-expanded',false).attr('aria-label',function(index,attr){
				return attr.replace('Close the','Open the');
			});
		});
	}
	$(document).on('click','.mobile-menu-trigger',function(){
		const isExpanded = $(this).attr('aria-expanded') === 'true';
		const mainMenu = $('#' + $(this).attr('aria-controls'));
		$(this).attr({
			'aria-expanded': !isExpanded,
			'aria-label': isExpanded ? 'Show navigation menu' : 'Hide navigation menu'
		}).text(isExpanded ? 'Menu' : 'Close');
		mainMenu.toggle().attr('aria-hidden', isExpanded);
		isExpanded ? closeActiveTrail() : openActiveTrail();
	});
	if(window.innerWidth <= rem(64)) {
		openActiveTrail();
	} else {
		closeActiveTrail();
	}

	var resizeTimer;
	function resizeFunction() {
		
		const mainMenu = $('#main-menu');
		const mainMenuTrigger = $('.mobile-menu-trigger');
		const isExpanded = mainMenuTrigger.attr('aria-expanded') === 'true';
		if(window.innerWidth > rem(64)) {
			mainMenuTrigger.text('Menu').attr({
				'aria-expanded':false,
				'aria-label':'Show navigation menu'
			});
			mainMenu.show().attr('style','').attr('aria-hidden', false);
			$('.nav--main *').attr('style','');
		} else {
			mainMenu.attr('aria-hidden', !isExpanded);
		}
		
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);