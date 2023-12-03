//  || VARIABLES - EASY CUSTOMIZATION
const EXTRA_PROJECT_SLIDER_INTERVAL = 4000; // ms

const EASTER_EGG_CLICK_COUNT = 5;


// || UI INTERACTION

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

// 
// => GRADIENT BACKGROUND
const contentScroll = document.querySelector(".content");
const spotGradient = document.querySelector(".spot-2");

contentScroll.addEventListener("scroll", (event) => {
      
  if (contentScroll.scrollTop > (contentScroll.clientHeight / 3)) 
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
