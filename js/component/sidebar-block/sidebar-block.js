(function($){

  $(document).on('click','.sidebar-accordion__trigger',function(){
		$(this).attr('aria-expanded',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		});
		$('#'+$(this).attr('aria-controls')).attr('aria-hidden',function(index,attr){
			return attr == 'true' ? 'false' : 'true';
		}).slideToggle();
	});

})(jQuery);