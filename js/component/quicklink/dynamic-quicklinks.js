(function ($) {
	
	if($('.dynamic-quicklinks__filter li a').length) {
		$('.dynamic-quicklinks__filter li:first a').addClass('is-selected').attr('aria-selected', true);
		$('.dynamic-quicklinks__filter li:not(:first) a').attr('tabindex', -1);
		$('.dynamic-quicklinks__filter select').val($('.dynamic-quicklinks__filter select option:first').val());
		$('.dynamic-quicklinks__section:first').addClass('is-active');
	}
	
	$('.dynamic-quicklinks__filter a').on('click',function(e){
		e.preventDefault();
		var href = $(this).attr('href');
    history.pushState(null, '', href);
		var selectedSection = $(this).attr('data-category');
		$('.dynamic-quicklinks__filter a.is-selected').removeClass('is-selected');
		$(this).addClass('is-selected');
		$('.dynamic-quicklinks__filter select').val(selectedSection);
		$('.dynamic-quicklinks__section.is-active').removeClass('is-active');
		$('.dynamic-quicklinks__section[data-category="'+selectedSection+'"]').addClass('is-active');
	});
	$('.dynamic-quicklinks__filter select').on('change',function(){
		var selectedSection = $(this).val();
		$('.dynamic-quicklinks__filter a.is-selected').removeClass('is-selected');
		$('.dynamic-quicklinks__filter a[data-category="'+selectedSection+'"]').addClass('is-selected');
		$('.dynamic-quicklinks__section.is-active').removeClass('is-active');
		$('.dynamic-quicklinks__section[data-category="'+selectedSection+'"]').addClass('is-active');
	});
	
})(jQuery);