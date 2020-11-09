export default (function () {
  $(document).on('click', 'a[href^="#"]:not([href="#"])', function (event) {
    event.preventDefault();

    $('html, body').animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      500
    );
  });
})();
