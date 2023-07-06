(function($){

  $('.content table').each(function() {
		var element = $(this);
		// Create the wrapper element
		var scrollWrapper = $('<div />', {
			'class': 'scrollable',
			'html': '<div tabindex="0" role="region" />' // The inner div is needed for styling
		}).insertBefore(element);
		// Store a reference to the wrapper element
		element.data('scrollWrapper', scrollWrapper);
		// Move the scrollable element inside the wrapper element
		element.appendTo(scrollWrapper.find('div'));
	});

  var resizeTimer;
	function resizeFunction() {

    if($('.scrollable').length) {
			$('.scrollable').each(function(){
				if ($(this).find('> div > table').not('table.sticky-header').outerWidth() > $(this).find('> div > table').not('table.sticky-header').parent().outerWidth()) {
					$(this).find('> div > table').not('table.sticky-header').data('scrollWrapper').addClass('has-scroll');
				} else {
					$(this).find('> div > table').not('table.sticky-header').data('scrollWrapper').removeClass('has-scroll');
				}
			});
		}

  };
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);