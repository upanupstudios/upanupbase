import { inView } from "../../globals";

(function ($) {

  if($('[data-visible]').length)
  window.addEventListener('scroll', function() {
    const dataVisibleList = document.querySelectorAll('[data-visible]');
    dataVisibleList.forEach((dataVisible) =>  {
      if(inView(dataVisible)) {
        dataVisible.setAttribute('data-visible','visible');
      }
    });
  },false);
  
})(jQuery);