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

    // const URL = window.location.href;
    // if(sessionStorage.getItem(tabID+': '+URL)) {
    //   const panel = document.querySelector('[id='+sessionStorage[tabID+': '+URL]+']');
    //   const tab = document.querySelector('[aria-controls='+sessionStorage[tabID+': '+URL]+']');
    //   selectTab(tab);
    //   selectPanel(panel);
    // } else {
    //   const panel = tab.querySelector('.tabs-component__panel');
    //   const tab = tab.querySelector('.tabs-component__list-item a');
    //   selectTab(tab);
    //   selectPanel(panel);
    // }

  });


});