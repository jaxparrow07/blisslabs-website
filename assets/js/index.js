//  || VARIABLES - EASY CUSTOMIZATION
const EXTRA_PROJECT_SLIDER_INTERVAL = 4000; // ms
const NAVIGATION_SCROLL_DELAY = 250; // ms

const GRADIENT_ACTIVATE_POSITION = 300; // px
const NAVIGATION_ACTIVATE_POSITION = 350;


const EASTER_EGG_CLICK_COUNT = 5;


// => Easter Egg
var iconClickCount = 1;

function letItGlow() {

  if (0 < iconClickCount && iconClickCount < 5 ) {

    iconClickCount++

  } else {

    if (iconClickCount === 0)
      return;

    iconClickCount = 0;
    
    requestFullScreen(document.body);

    contentScroll.scrollTop = 0;
    document.querySelector(".brand").classList.add("easter-egg-animation");

    document.querySelectorAll(".header-links, .slogan-container ").forEach((element) => { 
      element.style.setProperty("display", "none") });

    document.querySelector(".content").style.setProperty("overflow-y", "hidden");

  }
}

document.querySelector(".brand svg").addEventListener("click", letItGlow );

function requestFullScreen(element) {
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) {
      requestMethod.call(element);
  }

}

// Slogan tooltip
document.querySelectorAll('.slogan-scroller span').forEach((text) => {

  text.addEventListener('mouseover',() => {
    document.querySelector('.slogan-tooltip p').innerHTML = text.dataset.extra;
  });

});

// || HORIZONTAL SCROLL

var memberCardScroll = document.querySelector(".member-card-grid");
var memberCardVerticalVoid = document.querySelector(".member-filler-div");

var memberCardStickyHolder = document.querySelector(".sticky-holder");


// 
// => SCROLL CHANGES
var contentScroll = document.querySelector(".content");
var spotGradient = document.querySelector(".spot-2");
var scrollOffsetView = document.querySelector(".scroll-offset-view");
var footerView = document.querySelector("#footer");

var lastScrollPercentage,
lastScrollPosition,

relativeScrollStart,
relativeScollEnd,

scrollPercentage,
scrollPosition,

scrollRatio;

var contentScrollMax,
verticalScrollOffset,
memberCardWidth;

updateScrollCalculations("init");

/*

  Necessary scroll calculations

*/
function updateScrollCalculations(state) {

  switch(state) {
    case "init":

      memberCardWidth = memberCardScroll.scrollWidth - memberCardScroll.clientWidth; // Getting the acutal width of it

      // Scroll Ratio avoids the member card from completely disappearing on big screens by adding an offset value
      if (contentScroll.clientWidth > 1200) {
        memberCardVerticalVoid.style.height = `${memberCardWidth * 2 }px`;
        scrollRatio = -400;

      } else {
        memberCardVerticalVoid.style.height = `${memberCardWidth * 1 }px`;
        scrollRatio = 0;
      }

      contentScrollMax = (contentScroll.scrollHeight - contentScroll.clientHeight); // Maximum scroll of the top parent view ( CONTENT )
      verticalScrollOffset = memberCardStickyHolder.clientHeight; // Height of the sticky view

      relativeScrollStart = ( contentScrollMax - (scrollOffsetView.clientHeight));
      relativeScollEnd = (contentScrollMax - (verticalScrollOffset));

      break;
    
    case "scroll":
      lastScrollPercentage = scrollPercentage;
      lastScrollPosition = scrollPosition;
      
      scrollPercentage = (contentScroll.scrollTop / contentScrollMax ) * 100;
      scrollPosition = contentScroll.scrollTop;
      break;
    
    case "resize":
      updateScrollCalculations("init");
      break;

  }

}

function isSmoothScroll(event) {
  // Check if the event details indicate a smooth scroll
  if (event.detail) {
      return event.detail === 1; // Check for detail equal to 1 for Firefox
  } else if (event.wheelDelta) {
      return event.wheelDelta === -120; // Check for wheelDelta equal to -120 for other browsers
  } else {
      // Additional checks may be needed depending on your specific use case
      return false;
  }
}

contentScroll.addEventListener("scroll", (event) => {


  updateScrollCalculations("scroll");

  if (isSmoothScroll(event)) {
    // Handle smooth scroll
    console.log('Smooth scroll detected');
} else {
    // Handle user-initiated scroll
    console.log('User-initiated scroll detected');
  }

  // EXPENSIVE TASK FOR A LIL EFFECT
  //document.querySelector(":root").style.setProperty("--scroll-percentage", `${scrollPercentage / 2 }%` );

  // Horizontal Scroll Translation
  // Range Conditions: If scroll position is ABOVE FOOTER and is BELOW MEMBER LIST horizontal view, scroll
  if ( ( relativeScollEnd > contentScroll.scrollTop) && (contentScroll.scrollTop >  relativeScrollStart) ) {

    // Relative percentage of the horizontally scrollable part
    const relativeScrollPercentage = (((scrollPosition - relativeScrollStart) / (relativeScollEnd - relativeScrollStart) ) * 100);
    const scrollByCalc = ( (memberCardWidth + window.innerWidth) * relativeScrollPercentage ) / 100;

    memberCardScroll.style.setProperty("margin-left", `${(scrollByCalc * -1) - scrollRatio}px` );


  }

  if (lastScrollPosition < scrollPosition) {

    document.querySelector("header").classList.add("header__active");

  } else {

    document.querySelector("header").classList.remove("header__active");
    document.querySelector(".full-screen-nav").classList.remove("full-screen-nav__active");

  }



});

// Resizing messes up the horizontal scroll calculations
window.addEventListener("resize", () => {

  updateScrollCalculations("resize");

  if (( relativeScollEnd > contentScroll.scrollTop) && (contentScroll.scrollTop >  relativeScrollStart)) {

    contentScroll.scrollTo({top: relativeScrollStart, left: 0, behavior: "smooth"});

  }

});


// => Highlighted Projects
const projectCards = document.querySelectorAll(".project-card");

function selectProjectCard(index) {
  projectCards.forEach((project) => {

    project.classList.remove("project-card__active");

  })
  projectCards[index].classList.add("project-card__active");
}

projectCards.forEach((project, index) => {
  project.addEventListener("click", () => {
    selectProjectCard(index);
  })
})


// Extra Projects
const showLeftArrow = document.getElementById('extra-project-left');
const showRightArrow = document.getElementById('extra-project-right');
const extraProjectContainer = document.getElementById('extra-project-container');

var previousScrollPos = -1;
var previousScrollByButton = false;

showLeftArrow.addEventListener("click", () => {
  previousScrollByButton = true;

  extraProjectContainer.scrollBy({
    top: 0,
    left: -300,
    behavior: "smooth",
  });
});

showRightArrow.addEventListener("click", () => {
  previousScrollByButton = true;
  scrollArrowNext(); 
});



function scrollArrowNext() {
  if (previousScrollPos === extraProjectContainer.scrollLeft) {

    extraProjectContainer.scrollTo( {
      top: 0,
      left: 0,
      behavior: "smooth"
    });

  } else {

    extraProjectContainer.scrollBy({
      top: 0,
      left: 300,
      behavior: "smooth"
    });

    previousScrollPos = extraProjectContainer.scrollLeft;

  }
}

function autoScrollExtraProjects() {

  setInterval(() => {
    
    if (!previousScrollByButton) {
      scrollArrowNext();
    } else {
      previousScrollByButton = false;
    }

  }, EXTRA_PROJECT_SLIDER_INTERVAL);
}

// => Full screen navigation
document.querySelector("#expand-menu").addEventListener("click", () => {

  var fullScreenNav = document.querySelector(".full-screen-nav");

  fullScreenNav.classList.toggle("full-screen-nav__active");
  
  fullScreenNav.querySelectorAll(".link").forEach((elem) => {

    elem.addEventListener("click", () => {

      fullScreenNav.classList.remove("full-screen-nav__active");

      setTimeout(() => {

        document.querySelector(elem.dataset.link).scrollIntoView();

      }, 500);

    });

  });
  


});

window.addEventListener("load", () => {
  selectProjectCard(0);
  autoScrollExtraProjects();
});
