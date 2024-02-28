const { tabsID, setTabsAttrs, tabsKeyNav, currentTabSet, activateTab } = require("./globals");

document.addEventListener('DOMContentLoaded', function() {
  
  tabsID();
  
  var tabsComponents = document.querySelectorAll('.tabs-component:not([data-tabs-mobile=true])');
  tabsComponents.forEach(function(component) {
    setTabsAttrs(component);  
  });
  
  currentTabSet();
  
  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target.closest('.tabs-component__list-item a')) {
      e.preventDefault();
      activateTab(target);
    }
  });
  
  tabsKeyNav();
  
});