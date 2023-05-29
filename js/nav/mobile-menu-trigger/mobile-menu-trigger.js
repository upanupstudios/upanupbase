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
	$('.mobile-menu-trigger').on('click',function(){
		$(this).attr('aria-expanded',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		}).text(function(index,text){
			return text == 'Menu' ? 'Close' : 'Menu';
		});
		$('#'+$(this).attr('aria-controls')).toggle();
		if($(this).attr('aria-expanded') == 'true') {
			openActiveTrail();
		} else {
			closeActiveTrail();
		}
	});
	if(window.innerWidth <= rem(64)) {
		openActiveTrail();
	} else {
		closeActiveTrail();
	}

	var resizeTimer;
	function resizeFunction() {
		
		if(window.innerWidth > rem(64)) {
			$('.mobile-menu-trigger').attr('aria-expanded',false).text('Menu');
			$('.nav--main').show().attr('style','');
			$('.nav--main *').attr('style','');
		}
		
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);