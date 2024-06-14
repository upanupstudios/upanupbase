import { rem } from "../../globals";

(function($){

  $('.mobile-search-trigger').on('click',function(){
    const isExpanded = $(this).attr('aria-expanded') === 'true';
		const searchForm = $('#' + $(this).attr('aria-controls'));
    $(this).attr({
			'aria-expanded': !isExpanded,
			'aria-label': isExpanded ? 'Open the search form' : 'Close the search form'
		}).find('> *').text(isExpanded ? 'Open the search form' : 'Close the search form');
		searchForm.toggle().attr('aria-hidden', isExpanded);
    if($('.mobile-search-trigger[aria-expanded=true]').length) {
      $('.search-form').show().find('.form-item input').focus();
    } else {
      $('.search-form').hide();
    }
  });

  var resizeTimer;
	function resizeFunction() {
		
    const searchForm = $('#search-form');
    const searchFormTrigger = $('.mobile-search-trigger');
    const isExpanded = searchFormTrigger.attr('aria-expanded') === 'true';
		if(window.innerWidth > rem(64)) {
      searchFormTrigger.attr({
				'aria-expanded':false,
				'aria-label':'Open the search form'
			}).find('> *').text('Open the search form');
			searchForm.show().attr('style','').attr('aria-hidden', false);
		} else {
			searchForm.attr('aria-hidden', !isExpanded);
    }
		
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);