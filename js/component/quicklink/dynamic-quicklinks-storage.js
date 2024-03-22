(function ($) {
  function updateQuicklinks(element) {
    var selectedSection = $(element).attr('data-category');

    $('.dynamic-quicklinks__filter a').removeClass('is-selected').attr({
      'tabindex': -1,
      'aria-selected': false
    });

    $(element).addClass('is-selected').attr({
      'tabindex': 0,
      'aria-selected': true
    });

    $('.dynamic-quicklinks__section.is-active').removeClass('is-active');
    $('.dynamic-quicklinks__section[data-category="' + selectedSection + '"]').addClass('is-active');

    sessionStorage['dynamic-quicklinks'] = selectedSection;
  }

  $(document).ready(function() {
    var storedSection = sessionStorage['dynamic-quicklinks'];
    if ($('.dynamic-quicklinks__filter li a').length) {
      if (storedSection && $('.dynamic-quicklinks__filter a[data-category="' + storedSection + '"]').length) {
        updateQuicklinks($('.dynamic-quicklinks__filter a[data-category="' + storedSection + '"]')[0]);
      } else {
        $('.dynamic-quicklinks__filter li:first a').click();
      }
    }
  });

  $('.dynamic-quicklinks__filter a').on('click', function(e) {
    e.preventDefault();
    updateQuicklinks(this);
		var href = $(e).attr('href');
    history.pushState(null, '', href);
  });

  $(document).keydown(function(e) {
    var focusedWithin = $('.dynamic-quicklinks__filter a:focus');
    if (focusedWithin.length > 0) {
      var selected = $('.dynamic-quicklinks__filter a.is-selected').closest('li');
      var target;

      if (e.which === 37 || e.which === 38) {
        e.preventDefault();
        target = selected.prev('li').find('a');
        if (target.length) {
          updateQuicklinks(target[0]);
          target.focus();
					var href = $(target).attr('href');
					history.pushState(null, '', href);
        }
      } else if (e.which === 39 || e.which === 40) {
        e.preventDefault();
        target = selected.next('li').find('a');
        if (target.length) {
					updateQuicklinks(target[0]);
          target.focus();
					var href = $(target).attr('href');
					history.pushState(null, '', href);
        }
      }
    }
  });

})(jQuery);