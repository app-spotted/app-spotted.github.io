const navbar = document.getElementById("navigation"); //Navigation bar
const navigationToggle = document.getElementById("toggle"); //Button to toggle the navigation bar

setNavToggle();

// on the click of the nav toggle button i activate the showing nav
function setNavToggle() {
  navigationToggle.addEventListener("click", showNav);
  function showNav() {
    const visibility = navbar.getAttribute("data-visible");
    if (visibility === "false") navbar.setAttribute("data-visible", true);
    else navbar.setAttribute("data-visible", false);
  }
}
