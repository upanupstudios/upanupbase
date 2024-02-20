(function($) {

  $(document).on('click','.tabs__list-item a', function(e){
    e.preventDefault();

    $(this).attr({
      'aria-selected': true,
      'tabindex': 0
    }).parent().addClass('tabs__list-item--selected').siblings('.tabs__list-item').removeClass('tabs__list-item--selected').find('a').attr({
      'aria-selected': false,
      'tabindex': -1
    });
    const controller = $(this).attr('aria-controls');
    $('.tabs__panel[id="'+controller+'"]').removeClass('tabs__panel--hidden').siblings('.tabs__panel').addClass('tabs__panel--hidden');
  });

})(jQuery);