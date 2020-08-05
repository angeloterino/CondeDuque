jQuery(document).ready(function($) {

	'use strict';

  // var flexsliderWidth = ($('.flexslider').width() / 4);
  // alert(flexsliderWidth);
	/************** Toggle *********************/
    // Cache selectors
    var lastId,
        topMenu = $(".menu-first"),
        topMenuHeight = 50,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          
          if($(this).hasClass('external')) {
            return;
          }
            
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href=#"+id+"]").parent().addClass("active");
       }                   
    });



    $(window).scroll(function(){
         $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
     });



    $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });


  //   $('.flexslider').flexslider({
  //     // slideshow: true,
  //     // slideshowSpeed: 3000,  
  //     // animation: "fade",
  //     // directionNav: false,
  //     //directionNav: false,
  //     // controlsContainer: $(".custom-controls-container"),
  //     animation: "slide",
  //     controlNav: false,
  //     animationLoop: false,
  //     slideshow: false,
  //     itemMargin: 0,
  //     itemWidth: flexsliderWidth
  //   });


    $('.toggle-menu').click(function(){
        $('.menu-first').toggleClass('show');
        // $('.menu-first').slideToggle();
    });

    $('.menu-first li a').click(function(){
      $('.menu-first').removeClass('show');
    });

    /************** LightBox *********************/
      $(function(){
        $('[data-rel="lightbox"]').lightbox();
      });

     /************ DropDown-Select ***************/
     $(function(){
        jQuery('.filtro  .dropdown-menu').on('click', function(e,i){
          e.preventDefault();
          var _target = e.target;
          console.log(_target);
          var _parent = jQuery(e.target).closest('.dropdown');
          var _btn = _parent.find('.btn');
          jQuery(_btn).find('span').text(jQuery(_target).text().toUpperCase());
          jQuery('#hf' + jQuery(_btn).parent().attr("data-origin")).val(jQuery(_btn).text());
        });
        jQuery('.borrar-filtros').on('click', function(e,i){
          e.preventDefault();
          jQuery('.autocomplete .btn').each(function(i,e) {
            jQuery(e).find('span').text(jQuery(e).attr('data-origin').toUpperCase());
          });
          jQuery('.autocomplete input[type=text]').each(function(i,e) {
            jQuery(e).val('');
          });
        });
     });
});
    //Sobreescribimos los métodos de clases de bootstrap para añadirle funcionalidad extra.
    (function ($) {
      var methods = ['addClass', 'toggleClass', 'removeClass'];

      $.each(methods, function (index, method) {
        var originalMethod = $.fn[method];

        $.fn[method] = function () {
          var oldClass = this[0]?this[0].className:'';
          var result = originalMethod.apply(this, arguments);
          var newClass = this[0]?this[0].className:'';

          this.trigger(method, [oldClass, newClass]);

          return result;
        };
      });
    }(window.jQuery || window.Zepto));

    //Corrección para el flexslider en número de elementos
    (function() {
 
      // store the slider in a local variable
      var $window = $(window),
          flexslider = { vars:{} };
     
      // tiny helper function to add breakpoints
      function getGridSize() {
        return (window.innerWidth < 600) ? 1 : 4;
      }
          
      $window.load(function() {
        var minWidth = $('.flexslider').closest('.container').width();
        $('.flexslider').flexslider({
          //directionNav: false,
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemMargin: 0,
          itemWidth: (minWidth /  (window.innerWidth < 600) ? 1 : 4),
          minItems:  (window.innerWidth < 600) ? 1 : 4, // use function to pull in initial value
          maxItems:  (window.innerWidth < 600) ? 1 : 4 // use function to pull in initial value
        });
      });
     
      // check grid size on resize event
      $window.resize(function() {
        $flexslider = $('.flexslider');
        $flexslider.removeData('flexslider');
        $('ul.flex-direction-nav').remove();
        $flexslider.flexslider({
          //directionNav: false,
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemMargin: 0,
          itemWidth: ($flexslider.width() /  (window.innerWidth < 600) ? 1 : 4),
          minItems:  (window.innerWidth < 600) ? 1 : 4, // use function to pull in initial value
          maxItems:  (window.innerWidth < 600) ? 1 : 4 // use function to pull in initial value
        });
        if ($flexslider.find('.flex-viewport').length > 0)
          $flexslider.find('.flex-viewport').first().remove();
      });
    }());
$(document).ready(function(){
    $('.tab-pane').on('addClass', function (e, oldClass, newClass) {
      console.log('Changed from %s to %s due %s', oldClass, newClass, e.type);
      if(newClass.includes('active in'))
      {
        console.log('Includes active in');
        $flexslider = $(e.target).find('.flexslider');
        $flexslider.removeData('flexslider');
        $flexslider.find('ul.flex-direction-nav').remove();
        $flexslider.flexslider({
          //directionNav: false,
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemMargin: 0,
          itemWidth: ($flexslider.width() / (window.innerWidth < 600) ? 1 : 4),
          minItems: (window.innerWidth < 600) ? 1 : 4, // use function to pull in initial value
          maxItems: (window.innerWidth < 600) ? 1 : 4 // use function to pull in initial value
        });
        if ($flexslider.find('.flex-viewport').length > 0)
          $flexslider.find('.flex-viewport').first().remove();
      }
    });
});