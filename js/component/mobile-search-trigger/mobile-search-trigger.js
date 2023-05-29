import { rem } from "../../globals";

(function($){

  $('.mobile-search-trigger').on('click',function(){
    $(this).attr('aria-expanded',function(index,attr){
      return attr == 'true' ? 'false' : 'true';
    }).find('> *').text(function(index,text){
      return text == 'Open the search form' ? 'Close the search form' : 'Open the search form';
    });
    if($('.mobile-search-trigger[aria-expanded=true]').length) {
      $('.search-form').show().find('.form-item input').focus();
    } else {
      $('.search-form').hide();
    }
  });

  var resizeTimer;
	function resizeFunction() {
		
		if(window.innerWidth > rem(64)) {
			$('.mobile-search-trigger').attr('aria-expanded',false).find('> *').text('Open the search form');
			$('.search-form').attr('style','');
		}
		
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);