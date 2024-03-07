(function($) {
  if($('[data-calendar-list-result]').length) {
    $('[data-calendar-list-result]').each(function(){
      const day = $(this).attr('data-calendar-view-day');
      const month = $(this).attr('data-calendar-view-month');
      const resultLength = $('td[data-calendar-view-day="'+day+'"][data-calendar-view-month="'+month+'"]').length;
      if(resultLength < 1) {
        $(this).attr('data-calendar-list-result','hidden');
      }
    });
  }

})(jQuery);