/**
 *
 */

var form = (function ($) {
    var fields = {};

    return {
        formParse: function () {
            var form = $(this).parents('form'),
                set = form.find('.text-input'),
                valid = true;

            _.each(set, function (el) {
                var parent = $(el).parent();

                if ($(el).attr('required') && !$(el).val()) {
                    valid = false;
                    $(el).addClass('invalid');
                    parent.find('.valid').removeClass('dn');
                } else {
                    if ($(el).attr('type') === "email") {
                        if (validEmail($(el).val())) {
                            fields[$(el).attr('name')] = $(el).val();
                        } else {
                            $(el).addClass('invalid');
                            valid = false;
                            parent.find('.valid__e').removeClass('dn');
                        }
                    } else {
                        fields[$(el).attr('name')] = $(el).val();
                    }
                }

                $(el).on('change', setValid);
            });
            if (valid) {
                return formSender(JSON.stringify(fields));
            } else {
                $('.invalid:first').trigger('focus');
            }
        }
    }

    function formSender (data) {
        $('.js-feedback').addClass('dn');
        $('.js-feedback-result').removeClass('dn');
    }

    function setValid () {
        var parent = $(this).parent()

        if ($(this).val()){
            $(this).removeClass('invalid');
            parent.find('.valid').addClass('dn');
            if ($(this).attr('type') === 'email') {
                if (validEmail($(this).val())) {
                    parent.find('.valid__e').addClass('dn');
                } else {
                    $(this).addClass('invalid');
                    parent.find('.valid__e').removeClass('dn');
                }
            }
        } else {
            $(this).addClass('invalid');
            parent.find('.valid').removeClass('dn');
        }

    }

    function validEmail (str) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    }

}(jQuery));

jQuery('.js-send').on('click', form.formParse);
