import { activateTab } from "./globals";

(function (Drupal) {
  Drupal.behaviors.tabsClick = {
    attach: function (context) {
      // Use once to avoid duplicate event listeners.
      once('tabsClick', '.tabs-component__list-item a', context).forEach(function (tabLink) {
        tabLink.addEventListener('click', function (e) {
          e.preventDefault();
          // Importing is not standard in Drupal behaviors, so assume activateTab is globally available.
          if (typeof activateTab === 'function') {
            activateTab(tabLink);
          }
        });
      });
    }
  };
})(Drupal);