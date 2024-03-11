import { selectTab } from "./globals";

function logSessionStorageKeyEndingWith(endingString) {
  for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    console.log(1)
    if (key.endsWith(endingString)) {
      console.log(2)
      const tabElem = document.querySelector('[aria-controls='+sessionStorage.getItem(key)+']');
      console.log(tabElem)
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
      
      tabs.forEach(function(tab) {
        
        setTimeout(logSessionStorageKeyEndingWith(URL),200);
        
      });
    }
  };
}(jQuery, Drupal));