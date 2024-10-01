$('.navbar_menu_btn').on('click', function() {
  $('.navbar_menu').toggleClass('is-open');
  $('.navbar_layer').toggleClass('is-open');
  $('.navbar_menu_btn_line').toggleClass('is-open');
  $('body').toggleClass('no-scroll')
});
    
function menuItemClick() {
  $(".navbar_menu_item").on("click", function () {
    $("body").toggleClass("no-scroll");
  });
}

$('.navbar_menu_item').on('mouseenter mouseleave', function() {
  $('.navbar_menu_item').removeClass('is-hovered');
  $(this).addClass('is-hovered');
});

$('.navbar_menu').on('mouseleave', function() {
	$('.navbar_menu_item').removeClass('is-hovered');
  $(this).find('.is-contact').addClass('is-hovered');
});

$('.is-menu').on('click', function() {
  $('.navbar_menu_item_icon_line').toggleClass('is-open');
});
