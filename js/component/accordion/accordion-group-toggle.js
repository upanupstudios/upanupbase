(function($){

  $('.accordion-group__toggle').on('click',function(){
		$(this).attr('aria-expanded',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		}).text(function(index,text){
			return text == 'Open all' ? 'Close all' : 'Open all';
		});
		if($(this).attr('aria-expanded') == 'true') {
			$(this).parents('.accordion-group').find('.accordion').each(function(){
				$(this).find('.accordion__trigger').attr('aria-expanded',true).attr('aria-label',function(index,attr){
					return attr.replace(', Show this section',', Hide this section');
				});
				$(this).find('.accordion__content').attr('aria-hidden',false).slideDown();
			});
		} else {
			$(this).parents('.accordion-group').find('.accordion').each(function(){
				$(this).find('.accordion__trigger').attr('aria-expanded',false).attr('aria-label',function(index,attr){
					return attr.replace(', Hide this section',', Show this section');
				});
				$(this).find('.accordion__content').attr('aria-hidden',true).slideUp();
			});
		}
	});

})(jQuery);