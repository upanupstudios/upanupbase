(function (Drupal) {
  Drupal.behaviors.dynamicQuicklinks = {
    attach: function (context) {
      const filterLinks = context.querySelectorAll('.dynamic-quicklinks__filter li a');
      const sections = context.querySelectorAll('.dynamic-quicklinks__section');

      if (filterLinks.length) {
        filterLinks.forEach((link, i) => {
          if (i === 0) {
            link.classList.add('is-selected');
            link.setAttribute('aria-selected', 'true');
            link.setAttribute('tabindex', '0');
          } else {
            link.setAttribute('aria-selected', 'false');
            link.setAttribute('tabindex', '-1');
          }
        });
        const firstSection = context.querySelector('.dynamic-quicklinks__section');
        if (firstSection) {
          firstSection.classList.add('is-active');
        }
      }

      filterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          updateQuicklinks(this, filterLinks, sections);
        });
      });

      document.addEventListener('keydown', function (e) {
        const focused = document.activeElement;
        if (Array.from(filterLinks).includes(focused)) {
          const selected = Array.from(filterLinks).find(link => link.classList.contains('is-selected'));
          let target;
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = selected.closest('li').previousElementSibling;
            if (prev) {
              target = prev.querySelector('a');
            }
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = selected.closest('li').nextElementSibling;
            if (next) {
              target = next.querySelector('a');
            }
          }
          if (target) {
            updateQuicklinks(target, filterLinks, sections);
            target.focus();
          }
        }
      });

      function updateQuicklinks(element, allLinks, allSections) {
        const href = element.getAttribute('href');
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
        const selectedCategory = element.getAttribute('data-category');

        allLinks.forEach(link => {
          link.classList.remove('is-selected');
          link.setAttribute('tabindex', '-1');
          link.setAttribute('aria-selected', 'false');
        });

        element.classList.add('is-selected');
        element.setAttribute('tabindex', '0');
        element.setAttribute('aria-selected', 'true');

        allSections.forEach(section => {
          section.classList.remove('is-active');
        });
        const activeSection = context.querySelector('.dynamic-quicklinks__section[data-category="' + selectedCategory + '"]');
        if (activeSection) {
          activeSection.classList.add('is-active');
        }
      }
    }
  };
})(Drupal);