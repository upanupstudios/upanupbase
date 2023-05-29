(function($){

  if($('.sidebar .region-sidebar > *').length < 0 || $('.sidebar.sidebar--no-nav .region-sidebar > *:not(.block-menu)').length < 0) {
		$('.sidebar').addClass('sidebar--hidden');
		$('.content').addClass('content--fullwidth');
	}

})(jQuery);