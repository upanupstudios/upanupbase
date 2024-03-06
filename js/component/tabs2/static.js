import { selectTab } from "./globals";

document.addEventListener('DOMContentLoaded', function() {

  
  const tabs = document.querySelectorAll('.tabs-component[data-tab-type=static]:not([data-tab-attrs-set=true])');
  if(!tabs.length) return;
  
  tabs.forEach(function(tab, index) {
    if(tab.getAttribute('data-tab-attrs-set') == 'true') return;
    
    tab.setAttribute('data-tab-attrs-set',true);
    let tabID = tab.getAttribute('id');
    if(tabID == null) {
      tabID = 'static-tabs--'+index;
    }
    tab.querySelector('.tabs-component__list').setAttribute('role', 'tablist');
    const listItems = tab.querySelectorAll('.tabs-component__list-item');
    listItems.forEach(function(item) {
      item.setAttribute('role', 'presentation');
      const link = item.querySelector('a');
      const linkHref = link.getAttribute('href').split('#')[1];
      link.setAttribute('role', 'tab');
      link.setAttribute('id', 'list-item--' + tabID + '--' + linkHref);
      link.setAttribute('aria-controls', 'panel--' + tabID + '--' + linkHref);
      link.setAttribute('aria-selected', false);
      link.setAttribute('tabindex', '-1');
    });
    const panels = tab.querySelectorAll('.tabs-component__panel');
    panels.forEach(function(panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'list-item--' + tabID + '--' + panel.getAttribute('id'));
      panel.classList.add('tabs-component__panel--hidden');
    });

    const URL = window.location.href.split('?')[0];
    function currentTab() {
      if(sessionStorage.getItem(tabID+': '+URL)) {
        const tabElem = document.querySelector('[aria-controls='+sessionStorage[tabID+': '+URL]+']');
        selectTab(tabElem);
      } else {
        const tabElem = tab.querySelector('.tabs-component__list-item a');
        selectTab(tabElem);
      }
    };
    setTimeout(currentTab(),200);

  });


});