(function ($) {
	
	if ('sessionStorage' in window && typeof sessionStorage == 'object') {
		if($('.alerts-banner').length) {
			if(sessionStorage['alerts'] == 'closed') {
				$('.alerts-banner__slider-wrapper').hide().attr('aria-hidden',true);
				$('.alerts-banner__trigger').attr({
					title:'Open the Alerts slider',
					'aria-expanded':false
				}).text('Open');
				if($('.alerts-banner .views-row').length > 1) {
					$('.alerts-banner .alerts-banner__controls').addClass('slider-controls--hidden');
				}
			} else {
				sessionStorage['alerts'] = 'expanded';
				$('.alerts-banner__slider-wrapper').show().attr('aria-hidden',false);
				$('.alerts-banner__trigger').attr({
					title:'Close the Alerts slider',
					'aria-expanded':true
				}).text('Close');
				if($('.alerts-banner .views-row').length > 1) {
					$('.alerts-banner .alerts-banner__controls').removeClass('slider-controls--hidden');
				}
			}
			$('.alerts-banner__trigger').on('click',function(){
				$(this).attr({
					'title':function(index,attr) {
						return attr == 'Open the Alerts slider' ? 'Close the Alerts slider' : 'Open the Alerts slider';
					},
					'aria-expanded':function(index,attr) {
						return attr == 'true' ? 'false' : 'true';
					}
				}).text(function(index,text){
					return text == 'Close' ? 'Open' : 'Close';
				});
				$('.alerts-banner__slider-wrapper').slideToggle().attr('aria-hidden',function(index,attr){
					return attr == 'true' ? 'false' : 'true';
				});
				if($('.alerts-banner .views-row').length > 1) {
					$('.alerts-banner .alerts-banner__controls').toggleClass('slider-controls--hidden');
				}
				if($(this).attr('aria-expanded') == 'true') {
					sessionStorage['alerts'] = 'expanded';
				} else {
					sessionStorage['alerts'] = 'closed';
				}
			});
		} 
	};

})(jQuery);