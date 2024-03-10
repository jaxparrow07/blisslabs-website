//  || VARIABLES - EASY CUSTOMIZATION
const CURRENT_PAGE = "index";

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
selectProjectCard(0);


// Extra Projects
const showLeftArrow = document.getElementById('extra-project-left');
const showRightArrow = document.getElementById('extra-project-right');
const extraProjectContainer = document.getElementById('extra-project-container');

var previousScrollPos = -1;
var previousScrollByButton = false;


// Keyup for accessibility
"click keyup".split(" ").forEach((e) => {

  showRightArrow.addEventListener(e, () => {
    previousScrollByButton = true;
    scrollArrowNext(); 
  });

  showLeftArrow.addEventListener(e, () => {
    previousScrollByButton = true;
  
    extraProjectContainer.scrollBy({
      top: 0,
      left: -300,
      behavior: "smooth",
    });
  });

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


window.addEventListener("load", () => {
  autoScrollExtraProjects();
});
