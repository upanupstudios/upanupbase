import { activateTab } from "./globals";

(function (Drupal, drupalSettings) {
  Drupal.behaviors.tabsKeyNav = {
    attach: function (context, settings) {
      // Use once to avoid multiple bindings.
      context = context || document;
      context.querySelectorAll('.tabs-component__list-item a').forEach(function(tab) {
        tab.addEventListener('keydown', function(e) {
          // Only handle if in a tab list and on desktop, or inside .view
          if (
            (tab.parentElement.classList.contains('tabs-component__list-item') && window.innerWidth > 512) ||
            tab.closest('.view')
          ) {
            const arrow = e.key;
            if (arrow === 'ArrowLeft' || arrow === 'ArrowDown' || arrow === 'ArrowRight' || arrow === 'ArrowUp') {
              e.preventDefault();
            }
            // Next tab
            if ((arrow === 'ArrowRight' || arrow === 'ArrowDown') && tab.parentElement.nextElementSibling) {
              const nextTab = tab.parentElement.nextElementSibling.querySelector('a');
              if (nextTab) activateTab(nextTab);
            }
            // Previous tab
            if ((arrow === 'ArrowLeft' || arrow === 'ArrowUp') && tab.parentElement.previousElementSibling) {
              const prevTab = tab.parentElement.previousElementSibling.querySelector('a');
              if (prevTab) activateTab(prevTab);
            }
          }
        });
      });
    }
  };
})(Drupal, drupalSettings);