/**
* KeyNav Utilities for Menu Navigation (ES6 Module)
* Usage: Import and use the exported functions in your menu component.
*/

export function checkOverflow(element) {
  const leftEdge = element.getBoundingClientRect().left + element.offsetWidth;
  const viewportWidth = window.innerWidth;
  const siblings = Array.from(element.parentElement.children)
    .filter(
      (child) =>
        child !== element && child.classList.contains('menu__item-link-wrapper')
    );

  if (leftEdge > viewportWidth) {
    element.classList.add('is-overflowing');
    siblings.forEach((sibling) => {
      const trigger = sibling.querySelector('.submenu-trigger');
      if (trigger) {
        sibling.classList.add('has-overflow');
      }
    });
  } else {
    element.classList.remove('is-overflowing');
    siblings.forEach((sibling) => {
      const trigger = sibling.querySelector('.submenu-trigger');
      if (trigger) {
        sibling.classList.remove('has-overflow');
      }
    });
  }
}

export function keyNavHandler(event, settings) {
  const key = event.which || event.keyCode;
  const el = event.target;
  
  const matchKey = (setting) =>
    Array.isArray(setting) ? setting.includes(key) : key === setting;
  
  if (matchKey(settings.open)) {
    event.preventDefault();
    keyNavSectionOpen(el, settings);
  }
  if (matchKey(settings.close)) {
    event.preventDefault();
    keyNavSectionClose(el, settings);
  }
  if (matchKey(settings.next)) {
    event.preventDefault();
    keyNavItemNext(el, settings);
  }
  if (matchKey(settings.prev)) {
    event.preventDefault();
    keyNavItemPrev(el, settings);
  }
  if (matchKey(settings.click)) {
    event.preventDefault();
    keyNavItemClick(el);
  }
  if (event.shiftKey && key === 9 && settings.tabClose) {
    keyNavSectionClose(el, settings);
  }
}

export function keyNavSectionClose(element, settings) {
  const linkWrapper = element.closest(settings.menuLinkWrapperSelector);
  const menuItem = element.closest(settings.menuItemSelector);
  const menu = menuItem ? menuItem.closest(settings.menuSelector) : null;
  const nav = menu ? menu.closest('nav') : null;
  
  if (!settings.singleLevel && linkWrapper && menuItem) {
    menuItem.classList.remove(settings.openClass);
    
    const trigger = linkWrapper.querySelector(settings.triggerSelector);
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute(
        'aria-label',
        trigger.getAttribute('aria-label').replace('Close the', 'Open the')
      );
    }
    
    if (
      (!nav || (nav && !menu.closest('.menu--level-0'))) &&
      menu &&
      menu.previousElementSibling &&
      menu.previousElementSibling.matches(settings.menuLinkWrapperSelector)
    ) {
      const parentLink = menu.previousElementSibling.querySelector(settings.menuLinkSelector);
      if (parentLink) parentLink.focus();
    }
    
    if (menu) menu.classList.remove('is-overflowing');
  }
}

export function keyNavSectionOpen(element, settings) {
  const linkWrapper = element.closest(settings.menuLinkWrapperSelector);
  const menuItem = element.closest(settings.menuItemSelector);
  const submenu = linkWrapper ? linkWrapper.nextElementSibling : null;
  
  if (
    !settings.singleLevel &&
    linkWrapper &&
    menuItem &&
    submenu &&
    submenu.matches(settings.menuSelector)
  ) {
    menuItem.classList.add(settings.openClass);
    
    const firstLink = submenu.querySelector(
      `${settings.menuItemSelector}:first-child > ${settings.menuLinkWrapperSelector} ${settings.menuLinkSelector}`
    );
    if (firstLink) firstLink.focus();
    
    const trigger = linkWrapper.querySelector(settings.triggerSelector);
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute(
        'aria-label',
        trigger.getAttribute('aria-label').replace('Open the', 'Close the')
      );
    }
    
    checkOverflow(submenu);
  }
}

export function keyNavItemNext(element, settings) {
  const menuItem = element.closest(settings.menuItemSelector);
  if (!menuItem) return;
  
  if (!settings.singleLevel) {
    const nextItem = menuItem.nextElementSibling;
    if (nextItem) {
      const nextLink = nextItem.querySelector(
        `${settings.menuLinkWrapperSelector} ${settings.menuLinkSelector}`
      );
      if (nextLink) nextLink.focus();
    }
    menuItem.classList.remove(settings.openClass);
    const trigger = menuItem.querySelector(settings.triggerSelector);
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute(
        'aria-label',
        trigger.getAttribute('aria-label').replace('Close the', 'Open the')
      );
    }
  } else {
    const nextItem = menuItem.nextElementSibling;
    if (nextItem) {
      const nextLink = nextItem.querySelector(settings.menuLinkSelector);
      if (nextLink) nextLink.focus();
    }
  }
}

export function keyNavItemPrev(element, settings) {
  const menuItem = element.closest(settings.menuItemSelector);
  if (!menuItem) return;
  
  if (!settings.singleLevel) {
    const prevItem = menuItem.previousElementSibling;
    if (prevItem) {
      const prevLink = prevItem.querySelector(
        `${settings.menuLinkWrapperSelector} ${settings.menuLinkSelector}`
      );
      if (prevLink) prevLink.focus();
    }
    menuItem.classList.remove(settings.openClass);
    const trigger = menuItem.querySelector(settings.triggerSelector);
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute(
        'aria-label',
        trigger.getAttribute('aria-label').replace('Close the', 'Open the')
      );
    }
  } else {
    const prevItem = menuItem.previousElementSibling;
    if (prevItem) {
      const prevLink = prevItem.querySelector(settings.menuLinkSelector);
      if (prevLink) prevLink.focus();
    }
  }
}

export function keyNavItemClick(element) {
  element.click();
}

// Default settings for convenience
export const defaultKeyNavSettings = {
  open: 40, // DOWN
  close: 38, // UP
  next: 39, // RIGHT
  prev: 37, // LEFT
  click: [32, 13], // SPACE / ENTER
  menuSelector: '.menu',
  menuItemSelector: '.menu__item',
  menuLinkWrapperSelector: '.menu__item-link-wrapper',
  menuLinkSelector: 'a',
  triggerSelector: '.submenu-trigger',
  openClass: 'is-open',
  tabClose: true,
  singleLevel: false,
};

/**
* Utility to attach key navigation to menu links.
* @param {Element|Document} context
* @param {Object} settings
*/
export function attachKeyNav(context, settings = defaultKeyNavSettings) {
  const links = context.querySelectorAll(
    `${settings.menuSelector} ${settings.menuLinkWrapperSelector} ${settings.menuLinkSelector}:not([data-keynav-processed])`
  );
  links.forEach((link) => {
    link.setAttribute('data-keynav-processed', 'true');
    link.addEventListener('keydown', (event) => keyNavHandler(event, settings));
  });
}
