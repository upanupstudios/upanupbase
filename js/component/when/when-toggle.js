(function($){

    $('.when__toggle').click(function(){
        $('.when > ul').toggleClass('when__collapsed').toggleClass('when__expanded');
        $(this).attr('aria-expanded',function(index,attr){
            return attr == 'false' ? 'true' : 'false';
        })
        $(this).html(function(index,html) {
            return html == 'View More' ? 'View Less' : 'View More';
        });
    })
  
})(jQuery);