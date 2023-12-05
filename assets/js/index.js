//  || VARIABLES - EASY CUSTOMIZATION
const EXTRA_PROJECT_SLIDER_INTERVAL = 4000; // ms
const GRADIENT_ACTIVATE_POSITION = 300; // px

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
    document.querySelector(".links").style.setProperty("display", "none");
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


// || HORIZONTAL SCROLL

var memberCardScroll = document.querySelector(".member-card-grid");
var memberCardVerticalVoid = document.querySelector(".member-filler-div");

var memberCardWidth = memberCardScroll.scrollWidth - memberCardScroll.clientWidth; // Getting the acutal width of it
memberCardVerticalVoid.style.height = `${memberCardWidth}px`; // Setting the height to the width of the horizontal scroll view

// 
// => SCROLL CHANGES
var contentScroll = document.querySelector(".content");
var spotGradient = document.querySelector(".spot-2");
var scrollOffsetView = document.querySelector(".scroll-offset-view");
var footerView = document.querySelector("#footer");

var lastScrollPercentage;
var lastScrollPosition;
var contentScrollMax = (contentScroll.scrollHeight - contentScroll.clientHeight); // Maximum scroll of the top parent view ( CONTENT )

const horizontalScrollFactor = 20;
const verticalScrollOffset = document.querySelector(".sticky-holder").clientHeight; // Height of the sticky view

// Resizing messes up the horizontal scroll calculations
window.addEventListener("resize", () => {

  // ScrollMax needs to be updated on resize as there will be breakponits changing properties of elements
  var contentScrollMax = (contentScroll.scrollHeight - contentScroll.clientHeight);

  if (contentScroll.scrollTop > ( contentScrollMax - ( scrollOffsetView.clientHeight)) ) {

    contentScroll.scrollTo({top: ( contentScrollMax - ( scrollOffsetView.clientHeight - verticalScrollOffset)), left: 0, behavior: "smooth"});
    memberCardScroll.scrollTo({top: 0, left: 0, behavior: "smooth"});

  }

});

contentScroll.addEventListener("scroll", (event) => {

  var scrollPercentage = (contentScroll.scrollTop / contentScrollMax ) * 100;
  var scrollPosition = contentScroll.scrollTop;

  document.querySelector(":root").style.setProperty("--scroll-percentage", `${scrollPercentage / 2 }%` );

  // Horizontal Scroll Translation
  // Range Conditions: If scroll position is NOT ABOVE FOOTER and is NOT BELOW MEMBER LIST horizontal view, scroll
  if ( ((contentScrollMax - footerView.clientHeight ) > contentScroll.scrollTop) && (contentScroll.scrollTop > ( contentScrollMax - ( scrollOffsetView.clientHeight - verticalScrollOffset - footerView.clientHeight)) ) ) {

    const scrollByCalc = (scrollPosition - lastScrollPosition) * horizontalScrollFactor;
    memberCardScroll.scrollBy({top:0, left: scrollByCalc, behavior: "smooth"});

  }

  if (scrollPosition > GRADIENT_ACTIVATE_POSITION) 
  { 
    spotGradient.classList.add("spot-2-state");
    
  } else {
    
    if (Object.values(spotGradient.classList).includes("spot-2-state")) {
      
      spotGradient.classList.add("spot-2-state-remove");
      setTimeout( () => {
        spotGradient.classList.remove("spot-2-state");
        spotGradient.classList.remove("spot-2-state-remove");

      }, 1000);

    }
    
  }

  lastScrollPercentage = scrollPercentage;
  lastScrollPosition = scrollPosition;

});


// => Highlighted Projects
const projectCards = document.querySelectorAll(".project-card");

function selectProjectCard(index) {
  projectCards.forEach((project) => {

    project.classList.remove("active");

  })
  projectCards[index].classList.add("active");
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
            behavior: "smooth",
    });

  } else {

    extraProjectContainer.scrollBy({
      top: 0,
      left: 300,
      behavior: "smooth",
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


window.addEventListener("load", () => {
  selectProjectCard(0);
  autoScrollExtraProjects();
})
