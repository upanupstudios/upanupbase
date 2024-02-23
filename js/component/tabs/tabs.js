import { selectTab } from "./globals";
import { tabsID } from "./globals";
import { setTabsAttrs } from "./globals";
import { tabsKeyNav } from "./globals";
import { currentTabSet } from "./globals";

document.addEventListener('DOMContentLoaded', function() {
  currentTabSet();
  
  tabsID();
  
  var tabsComponents = document.querySelectorAll('.tabs-component');
  tabsComponents.forEach(function(component) {
    setTabsAttrs(component);  
  });
  
  document.addEventListener('click', function(e) {
    var target = e.target;
    if (target.closest('.tabs-component__list-item a')) {
      e.preventDefault();
      selectTab(target);
    }
  });
  
  tabsKeyNav();
});