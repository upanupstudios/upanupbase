// Sets the specified panel as 'active'
function selectPanel(elem) {
  if(elem == null) return;
  
  const panelSiblings = elem.parentElement.querySelectorAll('.tabs-component__panel');
  if(!panelSiblings.length) return;
  
  panelSiblings.forEach(function(panelSibling){
    panelSibling.classList.add('tabs-component__panel--hidden');
  });
  elem.classList.remove('tabs-component__panel--hidden');
}

// Sets the specified tab as 'active'
export function selectTab(elem) {
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
  const URL = window.location.href;
  sessionStorage[tabsComponentID+': '+URL] = tabAC;
}

// Sets the specified tab as 'active'
export function activateTab(elem) {
  
  selectTab(elem);
  
  elem.focus();
  
}