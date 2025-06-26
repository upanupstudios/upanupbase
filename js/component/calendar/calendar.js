(function ($) {

    var resizeTimer;
	function resizeFunction() {
		
        $( ".calendar-view-day__row.is-multi" ).each(function( index ) {
			//Fix multiday event responsiveness
            var eventMarginTop =  $( this ).get(0).style.marginTop;
			var eventHash = $(this).data('calendar-view-hash');
			if (eventMarginTop){  
				//match alignment of first in row
				var eventItem = $( this ).closest('tr').find(`[data-calendar-view-hash=${eventHash}]`).first(); 
				if (eventItem){   
					var newOffsetTop = eventItem.get(0).offsetTop;
					$( this ).css('margin-top', newOffsetTop+'px');
				}
			
			}
        });
	};
	$(window).on('load resize',function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 50);
	});
  
})(jQuery);
