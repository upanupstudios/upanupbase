// TODO write the selectTab function so that tab/panel "activation" can happen without focus and more generically (for use in the currentTabSet function)

export function selectTab(elem) {
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
  
  elem.focus();

  const tabControls = elem.getAttribute('aria-controls');
  const panel = document.getElementById(tabControls);
  const panelSiblings = panel.parentElement.querySelectorAll('.tabs-component__panel');
  panelSiblings.forEach(function(panelSibling){
    panelSibling.classList.add('tabs-component__panel--hidden');
  });
  panel.classList.remove('tabs-component__panel--hidden');
  
  const tabURL = elem.getAttribute('href').split('#')[1];
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search)
    searchParams.set("tab", tabURL);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
  }
}

export function tabsID() {
  const tabsComponents = document.querySelectorAll('.tabs-component');
  tabsComponents.forEach(function(component, index) {
    component.setAttribute('id', 'tabs-component--' + index);
  });
}

export function setTabsAttrs() {
  const tabsComponents = document.querySelectorAll('.tabs-component');
  tabsComponents.forEach(function(component) {
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
      link.setAttribute('href', '#panel--' + tabID + '--' + linkHref);
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
    component.querySelector('.tabs-component__list-item:first-child').classList.add('tabs-component__list-item--selected');
    component.querySelector('.tabs-component__list-item:first-child a').setAttribute('aria-selected', true);
    component.querySelector('.tabs-component__list-item:first-child a').setAttribute('tabindex', '0');
    const firstPanel = component.querySelector('.tabs-component__panel:first-child');
    firstPanel.classList.remove('tabs-component__panel--hidden');
  });
}

export function removeTabsAttrs() {
  const tabsComponents = document.querySelectorAll('.tabs-component:not(.view .tabs-component)');
  tabsComponents.forEach(function(component) {
    component.querySelector('.tabs-component__list').removeAttribute('role');
    const listItems = component.querySelectorAll('.tabs-component__list-item');
    listItems.forEach(function(item) {
      item.removeAttribute('role');
      const link = item.querySelector('a');
      link.removeAttribute('role');
      link.removeAttribute('id');
      link.removeAttribute('aria-controls');
      link.removeAttribute('aria-selected');
      link.removeAttribute('tabindex');
    });
    const panels = component.querySelectorAll('.tabs-component__panel');
    panels.forEach(function(panel) {
      panel.classList.remove('tabs-component__panel--hidden');
      panel.removeAttribute('role');
      panel.removeAttribute('aria-labelledby');
    });
  });
}

export function tabsKeyNav() {
  document.addEventListener('keydown', function(e) {
    const target = e.target;
    if (target.classList.contains('tabs-component__list-item') && window.innerWidth > rem(32) || target.closest('.view')) {
      const arrow = e.which;
      if (arrow === 37 || arrow === 38 || arrow === 39 || arrow === 40) {
        e.preventDefault();
      }
      // Next
      if ((arrow === 39 || arrow === 40) && target.parentElement.nextElementSibling) {
        const nextTab = target.parentElement.nextElementSibling.querySelector('a');
        selectTab(nextTab);
      }
      // Prev
      if ((arrow === 37 || arrow === 38) && target.parentElement.previousElementSibling) {
        const prevTab = target.parentElement.previousElementSibling.querySelector('a');
        selectTab(prevTab);
      }
    }
  });
}

// TODO on ajax set active tab based on param
export function currentTabSet() {
  let searchParams = new URLSearchParams(window.location.search)
  if(searchParams.get("tab")) {
    const tabValue = searchParams.get('tab');
    if(document.getElementById(tabValue)) {
      document.getElementById(tabValue)
    }
  }
}

// TODO tab param needs to be per-instance