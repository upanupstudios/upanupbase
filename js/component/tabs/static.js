import { selectTab } from "./globals";

function logSessionStorageKeyEndingWith(endingString) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key.endsWith(endingString)) {
      const tabElem = document.querySelector('[aria-controls="' + sessionStorage.getItem(key) + '"]');
      selectTab(tabElem);
    }
  }
}

(function (Drupal, once) {
  Drupal.behaviors.static_tabs = {
    attach: function (context) {
      const URL = window.location.href.split('?')[0];
      const tabs = once('static-tabs', document.querySelectorAll('.tabs-component[data-tab-type="static"]'), context);
      if (!tabs.length) return;

      tabs.forEach(function () {
        setTimeout(function () {
          logSessionStorageKeyEndingWith(URL);
        }, 0);
      });
    }
  };
})(Drupal, once);
