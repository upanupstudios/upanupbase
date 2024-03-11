import { selectTab } from "./globals";

function logSessionStorageKeyEndingWith(endingString) {
  for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if (key.endsWith(endingString)) {
      const tabElem = document.querySelector('[aria-controls='+sessionStorage.getItem(key)+']');
      selectTab(tabElem);
    }
  }
}

(function ($, Drupal)
{
  Drupal.behaviors.static_tabs = {
    attach: function (context, settings)
    {
      const URL = window.location.href.split('?')[0];
      const tabs = document.querySelectorAll('.tabs-component[data-tab-type=static]');
      if(!tabs.length) return;
      
      tabs.forEach(function() {
        
        setTimeout(function() {
          logSessionStorageKeyEndingWith(URL)
        },200);
        
      });
    }
  };
}(jQuery, Drupal));