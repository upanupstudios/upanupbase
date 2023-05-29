(function($){

	if($('.accordion__trigger').length && ($('.accordion__trigger').length != $('.accordion__trigger[aria-label]').length)) {
		$('.accordion__trigger').each(function(attr){
			if (typeof attr !== 'undefined' && attr !== false) {
				const accordionText = $(this).text().trim();
				$(this).attr('aria-label',accordionText+', Show this section');
			}
		});
	}

  $('.accordion__trigger').on('click',function(){
		$(this).attr('aria-expanded',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		}).attr('aria-label',function(index,attr){
			const accordionText = $(this).text().trim();
			return attr == (accordionText+', Hide this section') ? (accordionText+', Show this section') : (accordionText+', Hide this section');
		});
		$('#'+$(this).attr('aria-controls')).slideToggle().attr('aria-hidden',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		});
		if($(this).parents('.accordion-group').find('.accordion-group__toggle').length) {
			if(!$(this).parents('.accordion-group').find('.accordion__trigger[aria-expanded="true"]').length) {
				$(this).parents('.accordion-group').find('.accordion-group__toggle').attr('aria-expanded',false).text('Open all');
			}
			if(!$(this).parents('.accordion-group').find('.accordion__trigger[aria-expanded="false"]').length) {
				$(this).parents('.accordion-group').find('.accordion-group__toggle').attr('aria-expanded',true).text('Close all');
			}
		}
	});

})(jQuery);