import intlTelInput from 'intl-tel-input/build/js/intlTelInput.min';
import 'intl-tel-input/build/js/utils';
import '../_libs/req';
import { req } from '../_libs/req';

export default (() => {
  $('[type = "tel"]').each((i, el) => {
    const errorMap = [
      'Invalid number',
      'Invalid country code',
      'Too short',
      'Too long',
      'Invalid number',
    ];

    // Reset number field
    const reset = (container) => {
      $(el).removeClass('error');
      $(el).removeClass('valid');
      container.find('.iti__selected-flag').removeClass('valid');
      container.find('.iti__selected-flag').removeClass('error');
      container.siblings('.tel-msg').remove();
    };

    // Focus in styling
    const focusIn = (container) => {
      $(el).on('focusin', () => {
        container.find('.iti__selected-flag').addClass('focused');
      });
    };

    // Focus out unstyling
    const focusOut = (container) => {
      $(el).on('focusout', () => {
        container.find('.iti__selected-flag').removeClass('focused');
      });
    };

    // Validation number field
    const valid = (container, iti) => {
      reset(container);

      if (el.value.trim()) {
        $(el).unbind('focusout');
        if (iti.isValidNumber()) {
          $(el).addClass('valid');
          container.find('.iti__selected-flag').addClass('valid');
        } else {
          $(el).addClass('error');
          container.find('.iti__selected-flag').addClass('error');
          const errorCode = iti.getValidationError();
          $(
            `<div class="tel-msg font-weight-bold error">${errorMap[errorCode]}</div>`
          ).insertAfter(container);
        }
      } else {
        setTimeout(() => {
          focusOut(container);
        }, 200);
      }
    };

    $(el).one('click', function () {
      // Country number plugin init
      const iti = intlTelInput(el, {
        autoPlaceholder: 'aggressive',
        initialCountry: 'auto',
        geoIpLookup: function (success) {
          req(
            {
              url: 'http://geoplugin.net/json.gp',
              method: 'GET',
            },
            null,
            null,
            (res) => {
              const result = JSON.parse(res);
              var countryCode =
                result && result.geoplugin_countryCode
                  ? result.geoplugin_countryCode
                  : 'us';
              success(countryCode);
            }
          );
        },
      });

      // Waiting until plugin fully init
      iti.promise.then(() => {
        setTimeout(() => {
          const container = $(el).closest('.iti--allow-dropdown');

          focusIn(container);

          focusOut(container);

          $(el).focus();
          $(el).on('input', () => {
            valid(container, iti);
          });
        }, 200);
      });
    });
  });
})();
