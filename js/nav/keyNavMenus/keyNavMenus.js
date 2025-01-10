(function ($) {
  function initializeKeyNav(selector, callback, options = {}) {
    const observer = new MutationObserver((mutations, obs) => {
      if (document.querySelector(selector)) {
        callback();
        obs.disconnect(); // Stop observing once initialized
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function runMainKeyNav() {
    $('.nav--main a').keyNavMenus();
  }

  function runSidebarKeyNav() {
    $('.sidebar .menu a').keyNavMenus();
  }

  function runHeaderKeyNav() {
    $('.nav--header nav a, .footer nav a, .nav--social a').keyNavMenus({ singleLevel: true });
  }

  initializeKeyNav('.nav--main a', runMainKeyNav);
  initializeKeyNav('.sidebar .menu a', runSidebarKeyNav);
  initializeKeyNav('.nav--header nav a, .footer nav a, .nav--social a', runHeaderKeyNav);
})(jQuery);