function requestFullScreen(element) {
  // Supports most browsers and their versions.
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
      requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
      }
  }
}


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


var iconClickCount = 1;

// Easter egg
function letItGlow() {

  if (0 < iconClickCount && iconClickCount < 5 ) {

    iconClickCount++

  } else {

    if (iconClickCount === 0)
      return;

    iconClickCount = 0;
    
    requestFullScreen(document.body);

    contentScroll.scrollTop = 0;
    document.querySelectorAll(".brand")[0].classList.add("easter-egg-animation");
    document.querySelectorAll(".links")[0].style.setProperty("display", "none");
    document.querySelectorAll(".content")[0].style.setProperty("overflow-y", "hidden");

  }
}

document.querySelectorAll(".brand svg")[0].addEventListener("click", letItGlow );

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
  selectProjectCard(0);
  console.log(`
                                              ::                                            
                                           :--:                                           
                        .                 :----:                 ..                       
                       :--:              .------.              .--:                       
                       :----:.           --------           .:----:                       
                       :------:.        :--------:         :------:                       
                       .--------:      .----------.      :--------:                       
          :..          .----------.    :----------:    .----------.          ..:          
          .----::.      -----------:   ------------   :-----------      .::----:          
           :--------:.  :------------. ------------. ------------:  .:--------:           
            -----------: -------------..----------:.------------- :-----------            
             -----------.:-------------..--------: -------------:.-----------.            
              ----------- --------------.:------: -------------- -----------.             
               :---------: -------------- :----: -------------- :----------               
.:------:::::.....::------..-------------: ---- :-------------..------::.....:::::------:.
 .----------------::...::--..-------------..--..-------------..--::...::----------------. 
   .--------------------:.....------------- -- -------------.....:--------------------.   
     .----------------------:. :-----------....-----------: .:----------------------:     
       .-----------------------:..:--------:  :--------:..:-----------------------:       
         .:-----------------------:..-------  -------:.:-----------------------:.         
            .:----------------------:..-----  -----..:----------------------:.            
               .:---------------------:..---. ---..:---------------------:.               
                   .::------------------:.:-. -:.:------------------::.                   
                        ..::--------------..  ..--------------::..               
                        
                        
                                        BLISSLABS

                      Know what you're doing? Maybe you could lend us a hand
                              by volunteering as a front-end dev

`);
})
