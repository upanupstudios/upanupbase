const { rem } = require("../../globals");
const { activateTab, tabsID, setTabsAttrs, removeTabsAttrs, tabsKeyNav, currentTabSet } = require("./globals");

document.addEventListener('DOMContentLoaded', function() {

  tabsID();

  var tabsComponents = document.querySelectorAll('.tabs-component[data-tabs-mobile=true]');
  if (window.innerWidth > rem(32)) {
    setTabsAttrs(tabsComponents);
    currentTabSet();
  } else {
    removeTabsAttrs(tabsComponents);
  }

  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target.closest('.tabs-component__list-item a') && window.innerWidth > rem(32)) {
      e.preventDefault();
      activateTab(target);
    }
  });

  tabsKeyNav();
  
});

addEventListener('resize', function() {

  var tabsComponents = document.querySelectorAll('.tabs-component[data-tabs-mobile=true]');
  if (window.innerWidth > rem(32)) {
    setTabsAttrs(tabsComponents);
    currentTabSet();
  } else {
    removeTabsAttrs(tabsComponents);
  }
  
});