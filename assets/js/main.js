var isUserScroll = true;

var lastScrollPosition,
scrollPosition;

var contentScroll = document.querySelector(".content");
var rootCSS = document.querySelector(":root");

contentScroll.addEventListener("scroll", (event) => {

    scrollPosition = contentScroll.scrollTop;
    maxScrollPosition = contentScroll.scrollHeight - contentScroll.clientHeight;
    scrollFactor = scrollPosition / maxScrollPosition;

    rootCSS.style.setProperty("--scroll-factor", scrollFactor);

    if ( (lastScrollPosition > scrollPosition) && (scrollPosition > 1) ) {

        document.querySelector("header").classList.add("header__active");

    } else {

        if (isUserScroll) {
          document.querySelector("header").classList.remove("header__active");
          document.querySelector(".full-screen-nav").classList.remove("full-screen-nav__active");
        }

    }

    lastScrollPosition = scrollPosition;

});

function navigationUnhide() {
    isUserScroll = false;
    setTimeout(() => {
      isUserScroll = true;
    }, 1000);
}

function handleLinkItem(element) {

  navigationUnhide();

  if (element.dataset.page === CURRENT_PAGE) {
    document.querySelector(element.dataset.link).scrollIntoView();

  } else {

    var winlocation = (element.dataset.page === "index") ? "" : `${element.dataset.page}.html`;
    window.location.href = `./${winlocation}${element.dataset.link}`;
  }

}
  
  // Anchor links done via javascript to detect if it's been done by user
document.querySelectorAll("header nav a").forEach((elem) => {
  
    "click keyup".split(" ").forEach((e) => {
  
      elem.addEventListener(e , () => {
  
        handleLinkItem(elem);
    
      });
  
    });
  
});

  // => Full screen navigation
document.querySelector("#expand-menu").addEventListener("click", () => {
  
    var fullScreenNav = document.querySelector(".full-screen-nav");
  
    fullScreenNav.classList.toggle("full-screen-nav__active");
    
    fullScreenNav.querySelectorAll(".link").forEach((elem) => {
  
      elem.addEventListener("click", () => {
  
  
        fullScreenNav.classList.remove("full-screen-nav__active");
  
        setTimeout(() => {
  
          handleLinkItem(elem);

        }, 500);
  
      });
  
    });
    
});