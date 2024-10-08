// Function to get the computed font-size of the HTML element
function getComputedFontSize() {
  return parseFloat(window.getComputedStyle(document.documentElement).fontSize);
}

// Function to initialize swiper
function initSwiper($slider) {
  const baseRem = getComputedFontSize(); // Get the actual HTML font-size

  const swiper = new Swiper($slider.find(".swiper")[0], {
    speed: 400,
    loop: false,
    spaceBetween: baseRem * 3, // Use the dynamic baseRem for spaceBetween
    allowTouchMove: true,
    // mousewheel: true,

    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: baseRem * 2,
      },
      480: {
        slidesPerView: 1.2,
        spaceBetween: baseRem * 2,
      },
      768: {
        slidesPerView: 1.42,
        spaceBetween: baseRem * 3,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: baseRem * 3,
      },
      1241: {
        slidesPerView: 3,
        spaceBetween: baseRem * 3,
      },
    },

    navigation: {
      nextEl: $slider.find(".next")[0],
      prevEl: $slider.find(".prev")[0],
      disabledClass: "is-disabled",
    },
  });

  return swiper;
}

// Sliders and carousels functionality
$(".slider").each(function (index) {
  const $slider = $(this);
  let swiperInstance = initSwiper($slider);

  // Refresh Swiper on window resize
  $(window).on('resize', function() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true); // Destroy the current Swiper instance
    }
    swiperInstance = initSwiper($slider); // Reinitialize Swiper with updated settings
  });
});

