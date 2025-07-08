(function (Drupal) {
  'use strict';

  function updateQuicklinks(element) {
    var selectedSection = element.getAttribute('data-category');

    document.querySelectorAll('.dynamic-quicklinks__filter a').forEach(function (el) {
      el.classList.remove('is-selected');
      el.setAttribute('tabindex', -1);
      el.setAttribute('aria-selected', 'false');
    });

    element.classList.add('is-selected');
    element.setAttribute('tabindex', 0);
    element.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.dynamic-quicklinks__section.is-active').forEach(function (el) {
      el.classList.remove('is-active');
    });

    var activeSection = document.querySelector('.dynamic-quicklinks__section[data-category="' + selectedSection + '"]');
    if (activeSection) {
      activeSection.classList.add('is-active');
    }

    sessionStorage.setItem('dynamic-quicklinks', selectedSection);
  }

  Drupal.behaviors.dynamicQuicklinksStorage = {
    attach: function (context) {
      // Only run once per context.
      var filterLinks = once('dynamic-quicklinks-filter', '.dynamic-quicklinks__filter a', context);

      if (filterLinks.length) {
        // Restore from sessionStorage if possible.
        var storedSection = sessionStorage.getItem('dynamic-quicklinks');
        var storedLink = storedSection && context.querySelector('.dynamic-quicklinks__filter a[data-category="' + storedSection + '"]');
        if (storedLink) {
          updateQuicklinks(storedLink);
        } else {
          // Default to first link.
          updateQuicklinks(filterLinks[0]);
        }

        // Click event.
        filterLinks.forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            updateQuicklinks(link);
            var href = link.getAttribute('href');
            if (href) {
              history.pushState(null, '', href);
            }
          });
        });

        // Keyboard navigation.
        context.addEventListener('keydown', function (e) {
          var focused = document.activeElement;
          if (focused && focused.matches('.dynamic-quicklinks__filter a')) {
            var selected = context.querySelector('.dynamic-quicklinks__filter a.is-selected');
            var selectedLi = selected ? selected.closest('li') : null;
            var targetLink;
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && selectedLi) {
              e.preventDefault();
              var prevLi = selectedLi.previousElementSibling;
              if (prevLi) {
                targetLink = prevLi.querySelector('a');
              }
            } else if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && selectedLi) {
              e.preventDefault();
              var nextLi = selectedLi.nextElementSibling;
              if (nextLi) {
                targetLink = nextLi.querySelector('a');
              }
            }
            if (targetLink) {
              updateQuicklinks(targetLink);
              targetLink.focus();
              var href = targetLink.getAttribute('href');
              if (href) {
                history.pushState(null, '', href);
              }
            }
          }
        });
      }
    }
  };
})(Drupal);