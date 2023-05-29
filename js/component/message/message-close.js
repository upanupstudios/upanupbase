(function($){

  $(document).on('click','.messages__close',function(){
    $(this).parent('.messages').remove();
  });

})(jQuery);