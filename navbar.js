// Function to convert rem to pixels
function remToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// Target scroll position in pixels
const targetScrollY = remToPixels(10);

// Store the initial data-theme value
const navbarWrap = document.querySelector(".navbar_wrap");
const navbar = document.querySelector(".navbar_menu");
const navbarBg = document.querySelector(".navbar_menu_bg");
const initialTheme = navbarWrap.getAttribute("data-theme");
const fullLogo = document.querySelector(".is-full-logo");
const symbolLogo = document.querySelector(".is-symbol");

// Function to handle scroll event
function handleScroll() {
  const navbarBlur = document.querySelector(".navbar_blur");

  if (window.scrollY >= targetScrollY) {
    navbarWrap.classList.add("is-scrolled");
    navbarWrap.setAttribute("data-theme", "light");
    navbar.classList.add("is-scrolled");
    navbarBg.classList.add("is-scrolled");
    //navbar.setAttribute("data-theme", "light");
    navbarBlur.classList.add("is-scrolled");
    fullLogo.style.display = "none";
    symbolLogo.style.display = "block";
  } else {
    navbarWrap.classList.remove("is-scrolled");
    navbar.classList.remove("is-scrolled");
    navbarBg.classList.remove("is-scrolled");
    navbarBlur.classList.remove("is-scrolled");
    fullLogo.style.display = "block";
    symbolLogo.style.display = "none";
    // Change to dark theme only if the initial theme was dark
    if (initialTheme === "dark") {
      navbarWrap.setAttribute("data-theme", "dark");
      //navbar.setAttribute("data-theme", "dark");
    }
  }
}

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check in case the page is already scrolled
handleScroll();

// Opening mega-menu
$('.is-menu').on('click', function() {
  $('.navbar_menu').toggleClass('is-open');
  $('.navbar_layer').toggleClass('is-open');
  $('.navbar_menu_item_icon_line').toggleClass('is-open');
});
