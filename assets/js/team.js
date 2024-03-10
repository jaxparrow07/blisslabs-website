const CURRENT_PAGE = "team";

var divMemberSection = document.querySelector(".team__member-section");
var divHireSection = document.querySelector(".team__hiring-section");

divMemberSection.addEventListener("mousemove", e => {

    x = e.clientX - divMemberSection.getBoundingClientRect().left;
    y = e.clientY - divMemberSection.getBoundingClientRect().top;

    divMemberSection.style.setProperty("--x", `${x}px`);
    divMemberSection.style.setProperty("--y", `${y}px`);

});
divHireSection.addEventListener("mousemove", e => {

    x = e.clientX - divHireSection.getBoundingClientRect().left;
    y = e.clientY - divHireSection.getBoundingClientRect().top;

    divHireSection.style.setProperty("--x", `${x}px`);
    divHireSection.style.setProperty("--y", `${y}px`);

});