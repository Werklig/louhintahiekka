window.addEventListener("load", function () {
  // Get all slide elements with the class .ref_slider_item.is-text
  const slides = document.querySelectorAll(".ref_slider_item.is-text");

  // Get the total number of slides
  const totalSlides = slides.length;

  // Update all elements with [slide="total"] with the total number of slides
  document.querySelectorAll('[slide="total"]').forEach((element) => {
    element.textContent = totalSlides;
  });

  // Loop through each .ref_slider_item.is-text element
  slides.forEach((slide, index) => {
    // Find the [slide="current"] child of this slide
    const currentSlideElement = slide.querySelector('[slide="current"]');

    if (currentSlideElement) {
      // Update the textContent of the [slide="current"] element with the one-based index
      currentSlideElement.textContent = index + 1;
    }
  });
});

//build the slider
//collect video and images
//and build dots
$("#ref_slider_content_collection .ref_slider_item").not('.w-condition-invisible').each(function(index, item){
  //insert slide
  $('#ref_slider_content_target').append(item);
  //insert dot template clone
  $('#ref_slider_dot_list').append($('#slide_dot_template').clone().removeAttr('id'));
});
//clean up
$("#ref_slider_content_collection").empty().remove();


//!! only works with 1 video
//and it has to be the first of the slider
$(".ref_slider").each(function () {
  // Find all .ref_slider_item.is-img elements
  let childItems = $(this).find(".ref_slider_item.is-img");

  // Trigger only if there is more than one .ref_slider_item.is-img
  if (childItems.length <= 1) {
    return; // Exit if there is one or zero .ref_slider_item.is-img elements
  }

  let childArrow = $(this).find(".slider_btn");
  let childItemsTitle = $(this).find(".ref_slider_item.is-text").hide();
  let childDots = $(this).find(".ref_slider_dot_item");
  let totalSlides = childItems.length;
  let totalSlidesTitle = childItemsTitle.length;
  let activeIndex = 0;

  childItems.hide().first().css("display", "flex");
  childItemsTitle.first().css("display", "flex");
  gsap.set(childDots.eq(0).find(".ref_slider_dot_line"), { x: "0%" });

  // DOT LINES
  let tl2 = gsap.timeline({ repeat: -1 });
  let duration_default = 4;

  // if first item video -> wait for asynch
  let iframe = childItems.eq(0).find('iframe');
  if (iframe.length > 0) {
    let player = new Vimeo.Player(iframe);
      //wait for video duration
      player.getDuration().then(function(video_duration) {
        childDots.each(function (index) {
          tl2.addLabel(`step${index}`);
          let duration = duration_default;
          if (index == 0) {
            duration = video_duration;
          }
          tl2.to($(this).find(".ref_slider_dot_line"), {
            scaleX: "1.0",
            ease: "none",
            duration: duration,
            onComplete: () => {
              goNext(index + 1);
            },
          });
        });
      });
  }else{
    //if not asynch -> basic loop
    childDots.each(function (index) {
      tl2.addLabel(`step${index}`);
      tl2.to($(this).find(".ref_slider_dot_line"), {
        scaleX: "1.0",
        ease: "none",
        duration: duration_default,
        onComplete: () => {
          goNext(index + 1);
        },
      });
    });
  }

  // MAIN SLIDER CODE
  function moveSlide(nextIndex, forwards) {
    let tl3 = gsap.timeline();
    tl3.set(childDots.eq(nextIndex).find(".ref_slider_dot_line"), { x: "0%" });
    tl3.fromTo(
      childDots.eq(activeIndex).find(".ref_slider_dot_line"),
      { x: "0%" },
      { x: "100%" }
    );

    tl2.seek(`step${nextIndex}`);

    let titleFrom = 0;
    let titleDelay = "<";
    if (forwards) {
      titleFrom = 0;
      titleDelay = "<50%";
    }

    childItems.hide();
    childItemsTitle.hide();
    let prevItem = childItems.eq(activeIndex).css("display", "flex");
    let prevItemTitle = childItemsTitle.eq(activeIndex).css("display", "flex");
    let nextItem = childItems.eq(nextIndex).css("display", "flex");
    let nextItemTitle = childItemsTitle.eq(nextIndex).css("display", "flex");
    let tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });

    if (forwards) {
      tl.fromTo(
        nextItem,
        { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        0
      );
      if (nextItemTitle.length > 0) tl.fromTo(nextItemTitle, { opacity: 0 }, { opacity: 1 }, 0);
      tl.fromTo(
        prevItem,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        0
      );
      tl.fromTo(prevItemTitle, { opacity: 1 }, { opacity: 0 }, 0);
    } else {
      tl.fromTo(
        nextItem,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        0
      );
      if (nextItemTitle.length > 0) tl.fromTo(nextItemTitle, { opacity: 0 }, { opacity: 1 }, 0);
      tl.fromTo(
        prevItem,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
        0
      );
      tl.fromTo(prevItemTitle, { opacity: 1 }, { opacity: 0 }, 0);
    }

    // pause or play @ 0s videos
    let player = false;
    let iframe_prev = prevItem.find('iframe');
    let iframe_next = nextItem.find('iframe');
    if (iframe_prev.length > 0) {
      player = new Vimeo.Player(iframe_prev);
      player.pause();
    }else if(iframe_next.length > 0){
      player = new Vimeo.Player(iframe_next);
      player.setCurrentTime(0);
    }

    activeIndex = nextIndex;
  }

  // ARROWS
  function goNext(num) {
    let nextIndex = num;
    if (nextIndex > totalSlides - 1) nextIndex = 0;
    moveSlide(nextIndex, true);
  }

  // CLICK OF DOTS
  childDots.on("click", function () {
    let dotIndex = $(this).index();
    if (activeIndex > dotIndex) {
      moveSlide(dotIndex, false);
    } else if (activeIndex < dotIndex) {
      moveSlide(dotIndex, true);
    }
  });
});
