// Sliders and carousels functionality

const rem = 16;

$(".slider").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: 400,
    loop: false,
    //slidesPerView: 3,
    spaceBetween: rem * 3,
    allowTouchMove: true,
    //mousewheel: true,

    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: rem * 2,
      },
      480: {
        slidesPerView: 1.2,
        spaceBetween: rem * 2,
      },
      768: {
        slidesPerView: 1.42,
      },
      992: {
        slidesPerView: 3,
      },
    },

    navigation: {
      nextEl: $(this).find(".next")[0],
      prevEl: $(this).find(".prev")[0],
      disabledClass: "is-disabled",
    },
  });
});
