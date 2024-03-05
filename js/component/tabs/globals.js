// TODO
// Ensure functions only target mobile-only or non-mobile components - add [data-tabs-mobile=true]
// Update sessionStorage to include page URL so we don't set selections for tabs that haven't been loaded before (on another page)

import { rem } from "../../globals";

// Sets a unique ID on each tabs component
export function tabsID() {
  const tabsComponents = document.querySelectorAll('.tabs-component:not([data-tab-id-added=true]');
  tabsComponents.forEach(function(component, index) {
    const tabType = component.getAttribute('data-tab-type');
    component.setAttribute('id',tabType+'-tabs--' + index);
    component.setAttribute('data-tab-id-added',true);
  });
}

// Adds attributes to each tabs component and children
export function setTabsAttrs(tabs) {
  if(!tabs.length) return;

  tabs.forEach(function(component) {
    if(component.getAttribute('data-tab-attrs-set') == 'true') return;

    component.setAttribute('data-tab-attrs-set',true);
    let tabID = component.getAttribute('id');
    component.querySelector('.tabs-component__list').setAttribute('role', 'tablist');
    const listItems = component.querySelectorAll('.tabs-component__list-item');
    listItems.forEach(function(item) {
      item.setAttribute('role', 'presentation');
      const link = item.querySelector('a');
      const linkHref = link.getAttribute('href').split('#')[1];
      link.setAttribute('role', 'tab');
      link.setAttribute('id', 'list-item--' + tabID + '--' + linkHref);
      link.setAttribute('aria-controls', 'panel--' + tabID + '--' + linkHref);
      if(linkHref != '#panel--' + tabID + '--' + linkHref) {
        link.setAttribute('href', '#panel--' + tabID + '--' + linkHref);
      }
      link.setAttribute('aria-selected', false);
      link.setAttribute('tabindex', '-1');
    });
    const panels = component.querySelectorAll('.tabs-component__panel');
    panels.forEach(function(panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'list-item--' + tabID + '--' + panel.getAttribute('id'));
      panel.setAttribute('id', 'panel--' + tabID + '--' + panel.getAttribute('id'));
      panel.classList.add('tabs-component__panel--hidden');
    });
  });
}

// Removes attributes from each tabs component and children
export function removeTabsAttrs(tabs) {
  if(!tabs.length) return;

  tabs.forEach(function(component) {
    component.setAttribute('data-tab-attrs-set',false);
    component.removeAttribute('.tabs-component__list');
    component.removeAttribute('role');
    const listItems = component.querySelectorAll('.tabs-component__list-item');
    listItems.forEach(function(item) {
      item.removeAttribute('role');
      item.classList.remove('tabs-component__list-item--selected');
      const link = item.querySelector('a');
      link.removeAttribute('role');
      link.removeAttribute('id');
      link.removeAttribute('aria-controls');
      link.removeAttribute('aria-selected');
      link.removeAttribute('tabindex');
    });
    const panels = component.querySelectorAll('.tabs-component__panel');
    panels.forEach(function(panel) {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-labelledby');
      panel.removeAttribute('id');
      panel.classList.remove('tabs-component__panel--hidden');
    });
  });
}

// Arrow key nav for tabs
export function tabsKeyNav() {
  document.addEventListener('keydown', function(e) {
    const target = e.target;
    if (target.parentElement.classList.contains('tabs-component__list-item') && window.innerWidth > rem(32) || target.closest('.view')) {
      const arrow = e.key;
      if (arrow === 'ArrowLeft' || arrow === 'ArrowDown' || arrow === 'ArrowRight' || arrow === 'ArrowUp') {
        e.preventDefault();
      }
      // Next
      if ((arrow === 'ArrowRight' || arrow === 'ArrowDown') && target.parentElement.nextElementSibling) {
        const nextTab = target.parentElement.nextElementSibling.querySelector('a');
        activateTab(nextTab);
      }
      // Prev
      if ((arrow === 'ArrowLeft' || arrow === 'ArrowUp') && target.parentElement.previousElementSibling) {
        const prevTab = target.parentElement.previousElementSibling.querySelector('a');
        activateTab(prevTab);
      }
    }
  });
}

// Sets the specified panel as 'active'
function selectPanel(elem) {
  console.log(elem)
  if(elem == null) return;
  
  const panelSiblings = elem.parentElement.querySelectorAll('.tabs-component__panel');
  if(!panelSiblings.length) return;
  
  panelSiblings.forEach(function(panelSibling){
    panelSibling.classList.add('tabs-component__panel--hidden');
  });
  elem.classList.remove('tabs-component__panel--hidden');
}

// Sets the specified tab as 'active'
function selectTab(elem) {
  if(elem == null) return;

  elem.setAttribute('aria-selected', true);
  elem.setAttribute('tabindex', '0');
  elem.parentElement.classList.add('tabs-component__list-item--selected');
  
  const siblings = elem.parentElement.parentElement.querySelectorAll('.tabs-component__list-item');
  siblings.forEach(function(sibling) {
    if (sibling !== elem.parentElement) {
      sibling.classList.remove('tabs-component__list-item--selected');
      sibling.querySelector('a').setAttribute('aria-selected', false);
      sibling.querySelector('a').setAttribute('tabindex', '-1');
    }
  });
  const tabControls = elem.getAttribute('aria-controls');
  const panel = document.querySelector('[id='+tabControls+']');
  selectPanel(panel);
  
  const tabAC = elem.getAttribute('aria-controls');
  const tabsComponentID = elem.closest('.tabs-component').getAttribute('id');
  sessionStorage[tabsComponentID] = tabAC;
}

// Sets the specified tab as 'active'
export function activateTab(elem) {
  
  selectTab(elem);
  
  elem.focus();
  
}

// Checks for sessionStorage for each tabs component and sets the active tab, panel if found. If not found it sets the first tab and panel as active.
export function currentTabSet() {
  const tabElem = document.querySelectorAll('.tabs-component');
  if(!tabElem.length) return;
  
  tabElem.forEach(function(tabs){
    const tabsComponentID = tabs.getAttribute('id');
    console.log(tabs)
    console.log(tabsComponentID)
    if(sessionStorage.getItem(tabsComponentID)) {
      const panel = document.querySelector('[id='+sessionStorage[tabsComponentID]+']');
      const tab = document.querySelector('[aria-controls='+sessionStorage[tabsComponentID]+']');
      //console.log(panel)
      //console.log(tab)
      selectTab(tab);
      selectPanel(panel);
    } else {
      const panel = tabs.querySelector('.tabs-component__panel');
      const tab = tabs.querySelector('.tabs-component__list-item a');
      //console.log(panel)
      //console.log(tab)
      selectTab(tab);
      selectPanel(panel);
    }
  });
}