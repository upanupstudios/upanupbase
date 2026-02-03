(function ($, Drupal, once) {
  Drupal.behaviors.calendarList = {
    attach: function (context, settings) {
      $(once('calendar-list', '[data-calendar-list-result]', context)).each(function () {
        const day = $(this).attr('data-calendar-view-day');
        const month = $(this).attr('data-calendar-view-month');
        const resultLength = $('td[data-calendar-view-day="' + day + '"][data-calendar-view-month="' + month + '"]').length;
        if (resultLength < 1) {
          $(this).attr('data-calendar-list-result', 'hidden');
        }
      });
    }
  };
})(jQuery, Drupal, once);