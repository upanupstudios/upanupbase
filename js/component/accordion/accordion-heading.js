(function($){
  
  if($('.accordion__heading').length) {
    $('.accordion__heading').each(function(){
      if($(this).parents('.content-row').find('.content-row__title').length <= 0) {
        $(this).replaceWith(function(){
          return this.outerHTML.replace("<h3", "<h2").replace("</h3", "</h2");
        });
      }
    });
  }
  if($('.accordion-block__heading').length) {
    $('.accordion-block__heading').each(function(){
      if($(this).parents('.block').find('> h2').length > 0) {
        $(this).replaceWith(function(){
          return this.outerHTML.replace("<h2", "<h3").replace("</h2", "</h3");
        });
      }
    });
  }
  
})(jQuery);