/**
 *
 */

var popup = (function ($) {

    return {
        open: function () {
            $('.modal-layout').removeClass('dn');
            $('body').addClass('overflow');
        },

        close: function () {
            $('.modal-layout').addClass('dn');
            $('body').removeClass('overflow');
            $('.invalid').removeClass('invalid')
            $('.valid').addClass('dn');
            $('.valid__e').addClass('dn');
            $('.js-feedback-result').addClass('dn');
            $('.js-feedback').removeClass('dn');
        }
    }

}(jQuery));

jQuery('.js-popup').on('click', popup.open);
jQuery('.js-popup-close').on('click', popup.close);
