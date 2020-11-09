import 'jquery-validation/dist/jquery.validate.min';

(function ($) {
  $.fn.formValidation = function (config) {
    return this.each(function (i, el) {
      $(el).validate(config);
    });
  };
})(jQuery);
