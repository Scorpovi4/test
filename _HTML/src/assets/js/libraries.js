// node_modules libraries
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'slick-carousel/slick/slick.min';
import 'lazysizes/lazysizes.min';

('use strict');

$(window).on('load', function () {
  $('[data-slider]').each(function (i, el) {
    new Glider(el, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dots: '.dots-' + i,
      arrows: {
        prev: '.glider-prev-' + i,
        next: '.glider-next-' + i,
      },
    });
  });
});
