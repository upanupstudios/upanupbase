// Sets the specified tab as 'active'
export function selectTab(elem) {
  if(elem == null) return;

  const elemParent = elem.closest('.tabs-component');

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
  const controlledPanel = document.querySelector('[id='+tabControls+']');
  var tabItems = Array.prototype.slice.call( elem.parentElement.parentElement.children );
  var controlTabIndex = false;
  if(controlledPanel == null) {
    controlTabIndex = tabItems.indexOf(elem.parentElement);
  }
  
  const panels = elemParent.querySelectorAll('.tabs-component__panel');
  if(!panels.length) return;
  
  panels.forEach(function(panel,index){
    panel.classList.add('tabs-component__panel--hidden');
    if(controlledPanel == null && index == controlTabIndex) {
      panel.classList.remove('tabs-component__panel--hidden');
    }
  });
  if(controlledPanel != null) {
    controlledPanel.classList.remove('tabs-component__panel--hidden');
  }
  
  
  const tabAC = elem.getAttribute('aria-controls');
  const tabsComponentID = elem.closest('.tabs-component').getAttribute('id');
  const URL = window.location.href.split('?')[0];
  sessionStorage[tabsComponentID+': '+URL] = tabAC;
}

// Sets the specified tab as 'active'
export function activateTab(elem) {
  
  selectTab(elem);
  
  elem.focus();
  
}