(function ($) {
	
	if($('.dynamic-quicklinks__filter li button').length) {
		$('.dynamic-quicklinks__filter li:first button').addClass('is-selected');
		$('.dynamic-quicklinks__filter select').val($('.dynamic-quicklinks__filter select option:first').val());
		$('.dynamic-quicklinks__section:first').addClass('is-active');
	}
	
	$('.dynamic-quicklinks__filter button').on('click',function(){
		var selectedSection = $(this).attr('data-category');
		$('.dynamic-quicklinks__filter button.is-selected').removeClass('is-selected');
		$(this).addClass('is-selected');
		$('.dynamic-quicklinks__filter select').val(selectedSection);
		$('.dynamic-quicklinks__section.is-active').removeClass('is-active');
		$('.dynamic-quicklinks__section[data-category="'+selectedSection+'"]').addClass('is-active');
	});
	$('.dynamic-quicklinks__filter select').on('change',function(){
		var selectedSection = $(this).val();
		$('.dynamic-quicklinks__filter button.is-selected').removeClass('is-selected');
		$('.dynamic-quicklinks__filter button[data-category="'+selectedSection+'"]').addClass('is-selected');
		$('.dynamic-quicklinks__section.is-active').removeClass('is-active');
		$('.dynamic-quicklinks__section[data-category="'+selectedSection+'"]').addClass('is-active');
	});
	
})(jQuery);