//detect useragent
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

var $ = jQuery.noConflict();


// $(document).ready(function () {
//     $(".main-menu").meanmenu({
//         meanScreenWidth: "767",
//         meanMenuContainer: ".mobile-nav-menu"
//       });

//       $(".hamburger").click(function(){
//         $(".nav-bottom").slideToggle();
//       });

//       $('.o-play-btn').on('click', function () {
//         $(this).toggleClass('o-play-btn--playing');
//       });
// });


/* Sidenav
  -------------------------------------------------------*/


  var $navOpened = $(".navigation, #nav-icon");
  var $overlayopen = $(".overlay");

  $("#nav-trigger").on('click', function() {
    $navOpened.toggleClass('opened');
    $overlayopen.addClass('show-overlay')
  });

  $('.overlay').on('click', function() {
    $navOpened.removeClass('opened');
    $overlayopen.removeClass('show-overlay')
  });


  function setupRandomHeadings() {
    var a, b = $(".hero-section__content ul"),
        c = .5,
        d = .05,
        e = 3,
        f = 0,
        g = function() {
            var g = b.children().eq(f);
            a = new SplitText(g, {
                type: "words,chars"
            }), g.css("display", "inline"), TweenMax.staggerFrom(a.chars, c, {
                autoAlpha: 0,
                x: 5
            }, d), TweenMax.delayedCall(e, h)
        },
        h = function() {
            var e = b.children().eq(f);
            TweenMax.staggerTo(a.chars, c, {
                autoAlpha: 0,
                x: -2
            }, d), TweenMax.delayedCall(a.chars.length * d + c, function() {
                e.css("display", "none"), a.revert(), f = f >= $(b[0]).children().length - 1 ? 0 : f + 1, g()
            })
        };
    b.length > 0 && g()
}



function popinRandomHeadings() {
  var a = $(".hero-section__content ul"),
      b = 0;
  a.randomize("li");
  var c = function() {
      a.children().each(function(a) {
          a === b ? $(this).css("display", "inline") : $(this).css("display", "none")
      }), b = b >= $(a[0]).children().length - 1 ? 0 : b + 1, TweenMax.delayedCall(3, c)
  };
  a.length > 0 && c()
}




$(document).ready(function() {
  $.fn.randomize = function(a) {
      return this.each(function() {
          var b = $(this),
              c = b.children(a);
          c.sort(function() {
              return Math.round(Math.random()) - .5
          }), b.remove(a);
          for (var d = 0; d < c.length; d++) b.append(c[d])
      })
  }
  popinRandomHeadings()

//   Code for slider


new Swiper ('.ourPlace_container', {
    slidesPerView: 3,
    // spaceBetween: 30,
    pagination: {
      el: '.page-r',
      clickable: true,
    },
    loop: true,
    // slidesPerView: 'auto',
    mousewheel: false,
    centeredSlides: true,
    // spaceBetween: 105,
    speed: 500,
    slideToClickedSlide: true,
    keyboard: {
    enabled: true,
    },
    pagination: {
    el: '.page-r',
    clickable: true,
    },

    //  Responsive breakpoints
    breakpoints: {
    // when window width is <= 320px
    1199: {
        // spaceBetween: 50,
    },
    767: {
        // spaceBetween: 30,
    },
    }
})

var swiper = new Swiper('.swiper-container-full', {
    pagination: {
      el: '.swiper-pagination',
    },
  });


//   var swiper = new Swiper('.swiper-full', {
//     spaceBetween: 30,
//     slidesPerView: 'auto',
//     freeMode: 'true',
//     loop : false
// });



if ($('.swiper-container').length > 0) { //some-slider-wrap-in
    let swiperInstances = [];
    $(".swiper-container").each(function (index, element) { //some-slider-wrap-in
      const $this = $(this);
      $this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
  
      $this.parents('.slider').find(".navigation-buttons").attr('id', "pagination-" + index);

  
      $("#pagination-" + index).find(".swiper-button-prev").attr('id', "prev-" + index); //prev must be unique (ex: some-slider-prev)
      $("#pagination-" + index).find(".swiper-button-next").attr('id', "next-" + index); //next must be unique (ex: some-slider-next)
      swiperInstances[index] = new Swiper(".instance-" + index, { //instance need to be unique (ex: some-slider)
        // your settings ...
        navigation: {
          prevEl: "#prev-" + index,  //prev must be unique (ex: some-slider-prev)
          nextEl: "#next-" + index, //next must be unique (ex: some-slider-next)
        },
        loop: false,
        slidesPerView: 'auto',
        freeMode: 'true',
        spaceBetween: 20,
        //  Responsive breakpoints
        breakpoints: {
          // when window width is <= 320px
          1199: {
            spaceBetween: 20,
          },
          767: {
            spaceBetween: 20,
          },
        }
      });
    });
  }

  // add active class to navigation
   

    $(function($) {
      let url = window.location.href;
       $('.navigation__menu-list li a').each(function() {
        if (this.href === url) {
        $(this).addClass('active');
       }
      });
})

});








