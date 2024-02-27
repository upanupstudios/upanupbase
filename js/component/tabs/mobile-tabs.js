import { rem } from "../../globals";
import { activateTab ,tabsID ,setTabsAttrs ,removeTabsAttrs ,tabsKeyNav } from "./globals";

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
      activateTab($(this));
    }
    
  });

  tabsKeyNav();
  
})(jQuery);