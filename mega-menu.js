$(document).ready(function () {
  let tl = gsap.timeline({ paused: true, reversed: true });
  let body = $("body");
  let navbarWrap = $(".navbar_wrap");
  let initialTheme = $(navbarWrap).attr("data-theme");
  let menuItem = $(".navbar_menu_list").find(".navbar_menu_item_wrap");
  let megaMenu = $(".navbar_mega-menu_wrap");
  let megaMenuItem = $(".mega-menu_item");
  let megaMenuCmsRow = $(".mega-menu_cms_row");
  let megaMenuBlur = $(".navbar_mega-menu_blur");
  let textLink = $(".navbar_mega-menu_wrap").find(".text-link_wrap");
  //let localesItem = $(".navbar_mega-menu_wrap").find(".w-locales-item");
  let navbarMenuBg = $(".navbar_menu_bg");

  function remToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  tl.set(body, { overflow: "visible" }) // Disable scrolling when menu is open
    .set(megaMenuItem, { opacity: 0, top: "2rem" }) // Set initial opacity of mega-menu_item to 0
    .set(megaMenuCmsRow, { opacity: 0 })
    .set(textLink, { opacity: 0 })
    .set(megaMenuBlur, { opacity: 0 }) // Set initial opacity of mega-menu_cms_row to 0
    .set(menuItem, { opacity: 100, pointerEvents: "auto" }) // Set initial opacity of mega-menu_cms_row to 0
    //.set(localesItem, { opacity: 0 }) // Set initial opacity of mega-menu_cms_row to 0
    .set(navbarMenuBg, { opacity: 1 }) // Set initial opacity of mega-menu_cms_row to 0
    .to(body, { overflow: "hidden", duration: 0 }, "0") // Disable scroll when menu is open
    .to(
      megaMenuBlur,
      {
        display: "block",
        opacity: 1,
        duration: 0.3,
      },
      "0"
    ) // Animate navbar_blur opacity to 100%
    .to(
      navbarMenuBg,
      {
        opacity: 0,
        duration: 0.3,
      },
      "0"
    ) // Animate background color

    .to(
      menuItem,
      {
        opacity: 0,
        stagger: 0.1,
        pointerEvents: "none",
        duration: 0.3,
      },
      "<0"
    ) // Animate menu items
    .to(megaMenu, { display: "flex", top: "0vh", duration: 0.3 }, "<0.3") // Animate navbar_mega-menu_wrap down by 100vh
    .to(megaMenuItem, {
      opacity: 1,
      duration: 0.3,
      top: "0rem",
      stagger: 0.1,
    }) // Stagger animate mega-menu_item opacity to 100%
    .to(megaMenuCmsRow, { opacity: 1, duration: 0.4, stagger: 0.25 }, "<0.2")
    .to(textLink, { opacity: 1, duration: 0.3, stagger: 0.25 }, "<0");
  //.to(localesItem, { opacity: 1, duration: 0.3, stagger: 0.25 }, "<0.4");

  // Click event to toggle the timeline and theme
  $(".is-menu").click(function () {
    if ($(navbarWrap).attr("data-theme") === "light") {
      if (tl.reversed()) {
        $(navbarWrap).attr("data-theme", "dark");
        tl.play();
      } else {
        tl.reverse().eventCallback("onReverseComplete", function () {
          $(body).removeClass("no-scroll");
          if (initialTheme === "light") {
            $(navbarWrap).attr("data-theme", "light");
          } else if (window.scrollY >= remToPixels(30)) {
            $(navbarWrap).attr("data-theme", "light");
          }
        });
      }
    } else {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.reverse().eventCallback("onReverseComplete", function () {
          if (initialTheme === "light" || window.scrollY >= remToPixels(30)) {
            $(navbarWrap).attr("data-theme", "light");
          }
        });
      }
    }
  });
});
