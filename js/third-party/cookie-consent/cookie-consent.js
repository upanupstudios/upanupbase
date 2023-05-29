(function($){

  var resizeTimer;
	function resizeFunction() {

    if($('.cc_banner-wrapper').length) {
			$('body').css('padding-bottom',$('.cc_banner-wrapper').outerHeight());
		}
		$('.cc_btn_accept_all').on('click', function(){
			$('body').css('padding-bottom',0);
		});

  };
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	resizeFunction();

})(jQuery);