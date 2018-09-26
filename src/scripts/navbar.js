(function() {
  var $navbar = $(".navbar");
  var handleWindowScroll = function() {
    if (window.scrollY > 0) {
      $navbar.addClass("navbar-scrolling");
    } else {
      $navbar.removeClass("navbar-scrolling");
    }
  };
  setInterval(handleWindowScroll, 100);
})();
