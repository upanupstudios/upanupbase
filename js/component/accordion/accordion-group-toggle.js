(function($){

  $('.accordion-group__toggle').on('click',function(){
		var prefersReducedMotion = matchMedia("(prefers-reduced-motion)").matches;

		$(this).attr('data-toggle-state',function(index,attr){
			return attr == 'close' ? 'open' : 'close';
		}).attr('aria-pressed',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		}).text(function(index,text){
			return text == 'Open all' ? 'Close all' : 'Open all';
		});
		if($(this).attr('data-toggle-state') == 'open') {
			$(this).parents('.accordion-group').find('.accordion').each(function(){
				$(this).find('.accordion__trigger').attr('aria-expanded',true).attr('aria-label',function(index,attr){
					return attr.replace(', Show this section',', Hide this section');
				});
				$(this).find('.accordion__content').attr('aria-hidden',false);
				if (prefersReducedMotion){
					$(this).find('.accordion__content').fadeIn('fast');
				}else{
					$(this).find('.accordion__content').slideDown();
				}
			});
		} else {
			$(this).parents('.accordion-group').find('.accordion').each(function(){
				$(this).find('.accordion__trigger').attr('aria-expanded',false).attr('aria-label',function(index,attr){
					return attr.replace(', Hide this section',', Show this section');
				});
				$(this).find('.accordion__content').attr('aria-hidden',true);				
				if (prefersReducedMotion){
					$(this).find('.accordion__content').fadeOut('fast');
				}else{
					$(this).find('.accordion__content').slideUp();
				}
			});
		}
	});

})(jQuery);