(function (Drupal) {
  Drupal.behaviors.calendarList = {
    attach: function (context) {
      const results = context.querySelectorAll('[data-calendar-list-result]');
      results.forEach(function (el) {
        const day = el.getAttribute('data-calendar-view-day');
        const month = el.getAttribute('data-calendar-view-month');
        const selector = 'td[data-calendar-view-day="' + day + '"][data-calendar-view-month="' + month + '"]';
        const resultLength = context.querySelectorAll(selector).length;
        if (resultLength < 1) {
          el.setAttribute('data-calendar-list-result', 'hidden');
        }
      });
    }
  };
})(Drupal);