import { rem } from "../../globals";
import { selectTab } from "./globals";
import { tabsID } from "./globals";
import { setTabsAttrs } from "./globals";
import { removeTabsAttrs } from "./globals";
import { tabsKeyNav } from "./globals";

// TODO set active tab on ajax

(function($) {
  
  tabsID();
  
  if((window.innerWidth > rem(32)) && $('.tabs-component').length) {
    setTabsAttrs();  
  } else {
    removeTabsAttrs();
  }
  
  $(document).on('click','.tabs-component__list-item a', function(e){
    
    if(window.innerWidth > rem(32) || $(this).parents('.view').length) {
      e.preventDefault();
      selectTab($(this));
    }
    
  });

  tabsKeyNav();
  
})(jQuery);