$(function() {
  var $window = $(window);
  function handleFirstScroll() {
    $(".mouse").fadeOut();
    $window.off("scroll", handleFirstScroll);
  }
  $window.on("scroll", handleFirstScroll);
});
