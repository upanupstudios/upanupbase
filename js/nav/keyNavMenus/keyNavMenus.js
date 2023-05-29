(function($){

  $('.nav--main a').keyNavMenus();
	$('.sidebar .menu a').keyNavMenus();
	$('.nav--header nav a, .footer nav a, .nav--social a').keyNavMenus({
		singleLevel: true
	});

})(jQuery);