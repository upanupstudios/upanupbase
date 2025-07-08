
import {
  attachKeyNav,
  defaultKeyNavSettings
} from './keyNav.js';

(function (Drupal) {
  Drupal.behaviors.keyNav = {
    attach(context) {
      // Main navigation
      const mainNav = context.querySelector('.nav--main');
      if (mainNav) {
        attachKeyNav(mainNav, defaultKeyNavSettings);
      }

      // Sidebar navigation
      const sidebarMenu = context.querySelector('.sidebar .menu');
      if (sidebarMenu) {
        attachKeyNav(sidebarMenu, defaultKeyNavSettings);
      }

      // Header, footer, and social nav (singleLevel: true)
      const headerNav = context.querySelector('.nav--header nav');
      const footerNav = context.querySelector('.footer nav');
      const socialNav = context.querySelector('.nav--social');
      const singleLevelSettings = { ...defaultKeyNavSettings, singleLevel: true };
      if (headerNav) {
        attachKeyNav(headerNav, singleLevelSettings);
      }
      if (footerNav) {
        attachKeyNav(footerNav, singleLevelSettings);
      }
      if (socialNav) {
        attachKeyNav(socialNav, singleLevelSettings);
      }
    }
  };
})(Drupal);
