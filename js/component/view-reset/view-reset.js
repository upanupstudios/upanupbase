(function($){

	$('.content-row .view input[id*="edit-reset"]').on('click', function(e){
		e.preventDefault();
		const viewPosition = Math.floor($(this).parents('.view').offset().top);
		setTimeout(function(){
			window.location = window.location.href.split('?')[0] + '?pos=' + viewPosition;
		});
	});
	if(window.location.href.indexOf('?pos=') > -1) {
		$('html').scrollTop(window.location.href.split('?pos=')[1]);
	}
	
	
	$(document).ajaxComplete(function () {
		$('.content-row .view input[id*="edit-reset"]').on('click', function(e){
			e.preventDefault();
			const viewPosition = Math.floor($(this).parents('.view').offset().top);
			setTimeout(function(){
				window.location = window.location.href.split('?')[0] + '?pos=' + viewPosition;
			});
		});
		if(window.location.href.indexOf('?pos=') > -1) {
			$('html').scrollTop(window.location.href.split('?pos=')[1]);
		}
	}); 

})(jQuery);