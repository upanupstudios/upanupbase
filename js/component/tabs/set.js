import { currentTabSet, setTabsAttrs, tabsID } from "./globals";

currentTabSet();

(function($){

	$(document).ajaxComplete(function() {
    tabsID();
    setTabsAttrs();
    currentTabSet();
  }); 

})(jQuery);