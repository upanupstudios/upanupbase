import { rem } from "../../globals";

(function($){

  $(document).on('click','.submenu-trigger',function(){
		$(this).attr('aria-expanded',function(index,attr){
			return attr == 'false' ? 'true' : 'false';
		}).attr('aria-label',function(index,attr){
			if(attr.indexOf('Open the') > -1) {
				return attr.replace('Open the', 'Close the')
			} else {
				return attr.replace('Close the', 'Open the')
			}
		});
		$(this).parent().parent().toggleClass('is-open').siblings().find('.submenu-trigger').attr('aria-expanded',false).attr('aria-label',function(index,attr){
			if(attr.indexOf('Close the') > -1) {
				return attr.replace('Close the', 'Open the')
			}
		}).parent().parent().removeClass('is-open');
	});

	var resizeTimer;
	function resizeFunction() {

		if($('.nav--main .submenu-trigger').length) {
			if(window.innerWidth > rem(64)) {
				$('.nav--main .submenu-trigger').attr('disabled',true);
			} else {
				$('.nav--main .submenu-trigger').attr('disabled',false);
			}
		}
		
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);