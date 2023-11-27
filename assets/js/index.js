const contentScroll = document.querySelectorAll(".content")[0];
const spotGradient = document.querySelectorAll(".spot-2")[0];

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


window.addEventListener("load", () => {
  selectProjectCard(0)
})
