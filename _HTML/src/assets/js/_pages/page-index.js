import 'magnific-popup/dist/jquery.magnific-popup.min';

export default (() => {
  if ($('[data-gallery]').length > 0) {
    $('[data-gallery]').magnificPopup({
      type: 'image',
      preload: [1, 2],
      mainClass: 'mfp-fade',
      gallery: {
        enabled: true,
      },
    });
  }
})();
