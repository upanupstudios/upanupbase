import { tabsID, setTabsAttrs, tabsKeyNav, currentTabSet, activateTab } from "./globals";

document.addEventListener('DOMContentLoaded', function() {
  
  tabsID();
  
  var tabsComponents = document.querySelectorAll('.tabs-component');
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