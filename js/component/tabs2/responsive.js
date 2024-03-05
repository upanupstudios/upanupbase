import { rem } from "../../globals";

document.addEventListener('DOMContentLoaded', function() {
  if(window.innerWidth > rem(32)) {
    const tabs = document.querySelectorAll('.tabs-component[data-tab-type=responsive]:not([data-tab-attrs-set=true])');
    if(!tabs.length) return;
    
    tabs.forEach(function(tab, index) {
      if(tab.getAttribute('data-tab-attrs-set') == 'true') return;
      
      tab.setAttribute('data-tab-attrs-set',true);
      let tabID = tab.getAttribute('id');
      if(tabID == null) {
        tabID = 'responsive-tabs--'+index;
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
    });
  } else {
    const tabs = document.querySelectorAll('.tabs-component[data-tab-type=responsive]:not([data-tab-attrs-set=false]');
    if(!tabs.length) return;
    
    tabs.forEach(function(tab) {
      if(tab.getAttribute('data-tab-attrs-set') == 'false') return;
      
      tab.setAttribute('data-tab-attrs-set',false);
      tab.querySelector('.tabs-component__list').removeAttribute('role');
      const listItems = tab.querySelectorAll('.tabs-component__list-item');
      listItems.forEach(function(item) {
        item.removeAttribute('role');
        const link = item.querySelector('a');
        link.removeAttribute('role');
        link.removeAttribute('id');
        link.removeAttribute('aria-controls');
        link.removeAttribute('aria-selected');
        link.removeAttribute('tabindex');
      });
      const panels = tab.querySelectorAll('.tabs-component__panel');
      panels.forEach(function(panel) {
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
        panel.classList.remove('tabs-component__panel--hidden');
      });
    });
  }
});

document.addEventListener('resize', function() {
  if(window.innerWidth > rem(32)) {
    const tabs = document.querySelectorAll('.tabs-component[data-tab-type=responsive]:not([data-tab-attrs-set=true])');
    if(!tabs.length) return;
    
    tabs.forEach(function(tab, index) {
      if(tab.getAttribute('data-tab-attrs-set') == 'true') return;
      
      tab.setAttribute('data-tab-attrs-set',true);
      let tabID = tab.getAttribute('id');
      if(tabID == null) {
        tabID = 'responsive-tabs--'+index;
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
    });
  } else {
    const tabs = document.querySelectorAll('.tabs-component[data-tab-type=responsive]:not([data-tab-attrs-set=false])');
    if(!tabs.length) return;
    
    tabs.forEach(function(tab) {
      if(tab.getAttribute('data-tab-attrs-set') == 'false') return;
      
      tab.setAttribute('data-tab-attrs-set',false);
      tab.querySelector('.tabs-component__list').removeAttribute('role');
      const listItems = tab.querySelectorAll('.tabs-component__list-item');
      listItems.forEach(function(item) {
        item.removeAttribute('role');
        const link = item.querySelector('a');
        link.removeAttribute('role');
        link.removeAttribute('id');
        link.removeAttribute('aria-controls');
        link.removeAttribute('aria-selected');
        link.removeAttribute('tabindex');
      });
      const panels = tab.querySelectorAll('.tabs-component__panel');
      panels.forEach(function(panel) {
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
        panel.classList.remove('tabs-component__panel--hidden');
      });
    });
  }
});

// TODO set current tab if found in sessionStorage for this URL