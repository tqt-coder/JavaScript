const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function Validator(options) {
    var selectorRule = {};
    var formElement = $(options.form); // lấy form để xét
    function findParentElement(elementTag, selector) {
        while (elementTag) {
            if (elementTag.parentElement.matches(selector)) {
                return elementTag.parentElement;
            }
            elementTag = elementTag.parentElement;
        }
    }
    function validate(inputElement, rule) {
        var findParent = findParentElement(inputElement, options.formSelector);
        // inputElement.value lấy giá trị
        var errorElement = findParent.querySelector('.form__message');
        var formName = findParent;  // lấy thẻ cha của thẻ input
        var errorMessage; // = rule.test(inputElement.value);
        var arrRule = selectorRule[rule.selector];
        for (var i = 0; i < arrRule.length; i++) {
            var inputType = inputElement.type;
            switch (inputType) {
                case 'radio':
                case 'checkbox':
                    errorMessage = arrRule[i](formElement.querySelector(rule.selector + ':checked'))
                    break;
                default:
                    errorMessage = arrRule[i](inputElement.value);
            }

            if (errorMessage)
                break;
        }
        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            formName.classList.add('invalid');
        }
        else {
            errorElement.innerHTML = '';
            formName.classList.remove('invalid');
        }
        return !errorMessage;

    }
    if (formElement) {

        // khi submit
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule, index) {
                var inputElement = formElement.querySelector(rule.selector); // lấy từng thẻ input của form

                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }

            });
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var input = formElement.querySelectorAll('[name]:not([disabled])');// lấy tất cả thẻ có chứa name
                    var convertArr = Array.from(input);// [...input] tạo mảng
                    var result = convertArr.reduce(function (callback, input) {
                        switch (input.type) {
                            case 'radio':
                                callback[input.name] = formElement.querySelector('input[ name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                // tạo mảng rỗng để gán giá trị cho checkbox ở lần lặp đầu tiên
                                if (!Array.isArray(callback[input.name])) {
                                    callback[input.name] = [];
                                }
                                // không checkec có thì cho ra mãng rỗng 
                                if (!input.matches(':checked')) {
                                    return callback;
                                }
                                else {
                                    callback[input.name].push(input.value);
                                }

                                break;
                            case 'file':
                                callback[input.name] = input.files;
                                break;
                            default:
                                callback[input.name] = input.value;
                        }
                        return callback;
                    }, {});
                    options.onSubmit(result);
                }
                else {
                    formElement.submit();
                }
            }
            else {
                console.warn('the form is emty')
            }


        };

        // lặp qua mảng rules từ form truyền vào
        options.rules.forEach(function (rule) {
            var inputElements = formElement.querySelectorAll(rule.selector); // lấy từng thẻ input của form
            [...inputElements].forEach(function (inputElement) {
                var findParent = findParentElement(inputElement, options.formSelector); // lấy thẻ cha từ mọi thẻ
                var formName = findParent;  // lấy thẻ cha của thẻ input
                var errorElement = findParent.querySelector('.form__message'); // từ thẻ cha truy xuất đến thẻ con

                if (Array.isArray(selectorRule[rule.selector])) {
                    selectorRule[rule.selector].push(rule.test);
                }
                else {
                    selectorRule[rule.selector] = [rule.test]; // value của mảng bằng rule.test(...);

                }
                // khi blur vào thẻ input
                inputElement.onblur = function () {
                    validate(inputElement, rule);

                }
                inputElement.oninput = function () {
                    errorElement.innerHTML = '';
                    formName.classList.remove('invalid');
                };

            });


        });

    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường'
        },
    }
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return checkEmail.test(value.trim()) ? undefined : message || 'Vui lòng nhập Email';
        },
    }
};
Validator.isMinLenth = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {

            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        },
    }
}
Validator.isConfirmed = function (selector, getPass, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getPass() ? undefined : message || 'Giá trị nhập lại chưa đúng';
        }
    }
}