if (localStorage.getItem("cookieSeen") != "shown") {
  $(".cookie-banner").delay(2000).fadeIn();
}
$(".close").click(function () {
  localStorage.setItem("cookieSeen", "shown");
  $(".cookie-banner").fadeOut();
});
