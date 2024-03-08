import { selectTab } from "./globals";

const URL = window.location.href.split('?')[0];

function logSessionStorageKeyEndingWith(endingString) {
  for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if (key.endsWith(endingString)) {
      const tabElem = document.querySelector('[aria-controls='+sessionStorage.getItem(key)+']');
      selectTab(tabElem);
    }
  }
}

function currentTab() {
  logSessionStorageKeyEndingWith(URL);
};

function staticTabs() {
  
  const tabs = document.querySelectorAll('.tabs-component[data-tab-type=static]');
  if(!tabs.length) return;
  
  tabs.forEach(function(tab) {
    
    setTimeout(currentTab(),200);
    
  });
  
}

(function ($, Drupal)
{
  Drupal.behaviors.static_tabs = {
    attach: function (context, settings)
    {
      staticTabs();
    }
  };
}(jQuery, Drupal));