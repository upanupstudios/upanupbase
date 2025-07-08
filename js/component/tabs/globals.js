export function selectTab(elem) {
  if (!elem) return;

  const elemParent = elem.closest('.tabs-component');
  elem.setAttribute('aria-selected', 'true');
  elem.setAttribute('tabindex', '0');
  elem.parentElement.classList.add('tabs-component__list-item--selected');

  // Deselect siblings
  elem.parentElement.parentElement.querySelectorAll('.tabs-component__list-item').forEach((sibling) => {
    if (sibling !== elem.parentElement) {
      sibling.classList.remove('tabs-component__list-item--selected');
      const siblingLink = sibling.querySelector('a');
      if (siblingLink) {
        siblingLink.setAttribute('aria-selected', 'false');
        siblingLink.setAttribute('tabindex', '-1');
      }
    }
  });

  // Handle panels
  const tabControls = elem.getAttribute('aria-controls');
  const controlledPanel = document.getElementById(tabControls);
  const tabItems = Array.from(elem.parentElement.parentElement.children);
  let controlTabIndex = false;
  if (!controlledPanel) {
    controlTabIndex = tabItems.indexOf(elem.parentElement);
  }

  const panels = elemParent.querySelectorAll('.tabs-component__panel');
  if (!panels.length) return;

  panels.forEach((panel, index) => {
    panel.classList.add('tabs-component__panel--hidden');
    if (!controlledPanel && index === controlTabIndex) {
      panel.classList.remove('tabs-component__panel--hidden');
    }
  });
  if (controlledPanel) {
    controlledPanel.classList.remove('tabs-component__panel--hidden');
  }

  // Store selected tab in sessionStorage
  const tabsComponentID = elemParent.getAttribute('id');
  const URL = window.location.href.split('?')[0];
  sessionStorage[`${tabsComponentID}: ${URL}`] = tabControls;
}

export function activateTab(elem) {
  selectTab(elem);
  elem.focus();
}

export function attachTabsComponent(context = document) {
  context.querySelectorAll('.tabs-component__list-item > a').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(tab);
    });
  });
}
