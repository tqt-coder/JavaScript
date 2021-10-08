// 'use strict'
// function Validate(){
//     const form1 = document.querySelector('.content');
//     const arrInput = form1.querySelectorAll('input[name][rule]:not(:disabled)');
//     const validateRules = {
//         isRequire: (value)  =>  value ? undefined : "Vui lòng nhập đáp án",
//         isNumber : (value) => typeof value === 'number' ? undefined : "Vui lòng nhập số",
//     };
//     // console.log(validateRules.isNumber());
//    var formRules = Array.from(arrInput).reduce( (callback,value) => {
//         var rules = value.getAttribute('rule').split('|');
//         for(var rule of rules){
//             if(Array.isArray(callback[value.name])){
//                 callback[value.name].push(validateRules[rule]);
//             }
//             else{
//                 callback[value.name] = [validateRules[rule]];
//             }
//         }
//         value.onblur = inputValidate;
//         return callback;
//     },{});
//     function inputValidate(event){
//         const input = event.target;
//         let messageErr;
//         for(var i = 0; i < formRules[input.name].length ; i++){
//             var error = formRules[input.name][i];
//             var parentName = document.documentElement
//         }
//     }
// };


function Validator(formSelector) {
    const _this = this;
    const formNameSelector = '.question';
    const message = '.check__result'
    // tạo một đối tượng đưa ra các rules cho form
    var validatorRules = {
        isRequire: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        isNumber : (value) => typeof Number(value) === 'number' ? undefined : "Vui lòng nhập số",
    };
    // lấy cả form ra
    var formElement = document.querySelector(formSelector);
    // khi form tồn tại
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rule]');
        // tạo một object lấy name và rule của từng thẻ input
        var formRules = Array.from(inputs).reduce(function (callback, input) {
            var rules = input.getAttribute('rule').split('|'); // một mảng chứa các rule đối với một thẻ input
            for (var rule of rules) {
                var ruleHasMin = rule.includes(':');
                var ruleInfor;
                if (ruleHasMin) {
                    ruleInfor = rule.split(':');
                    rule = ruleInfor[0];
                }
                var ruleFuc = validatorRules[rule];

                if (ruleHasMin) {
                    ruleFuc = ruleFuc(ruleInfor[1]);
                };

                if (Array.isArray(callback[input.name])) { // khi có mảng thì thêm function rule vào
                    callback[input.name].push(ruleFuc);
                }
                else {
                    callback[input.name] = [ruleFuc]; // tạo mảng 
                }
            }
            // hàm validate để có các sự kiện change, blur
            input.onblur = validate;
            input.oninput = handlerClearError;
            return callback
        }, {});
        function validate(event) {
            const input = event.target;
            var messageError;
            for (var i = 0; i < formRules[input.name].length; i++) {
                var arrRule = formRules[input.name][i];
                var parentInput = findParent(input, formNameSelector);
                switch (input.type) {
                    case 'radio':
                    case 'checkbox':
                        var getValue;
                        if (parentInput.querySelector('input[name]:checked:not(disabled)')) {
                            getValue = parentInput.querySelector('input[name]:checked:not(disabled)').value;
                        }
                        else {
                            getValue = '';
                        }
                        messageError = arrRule(getValue);
                        break;
                    default:
                        messageError = arrRule(input.value);
                }
                if (parentInput) {
                    var textError = parentInput.querySelector(message);
                    if (textError) {
                        if (messageError) {
                            parentInput.classList.add('invalid');
                            textError.innerHTML = messageError;
                            break;
                        }
                        else {
                            parentInput.classList.remove('invalid');
                            textError.innerHTML = '';
                        }
                    }
                }
            };
            return !messageError;
        }
        // hàm clear messError
        function handlerClearError(event) {
            const input = event.target;
            var messageError;
            var arrRule = formRules[input.name].find(function (rule) {
                messageError = rule(input.value);
                return rule;
            })
            // messageError = arrRule(input.value); // dư 

            var parentInput = findParent(event.target, formNameSelector);
            var textError = parentInput.querySelector(message);
            if (parentInput.matches('.invalid')) {
                parentInput.classList.remove('invalid');
                if (!messageError) {
                    textError.innerHTML = '';
                }
            }
        }
        function findParent(elementInput, selector) {
            while (elementInput) {
                if (elementInput.parentElement.matches(selector)) {
                    return elementInput.parentElement;
                }
                elementInput = elementInput.parentElement;
            }
        }
    }
    formElement.onsubmit = function (e) {
        e.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rule]:not(:disabled)');
        var isFormValid = true;
        for (var input of inputs) {
            var answer = validate({
                target: input,
            });
            if (!answer) {
                isFormValid = false;
            }
        }
        // khi mà form hợp lệ
        if (isFormValid) {
            if (typeof _this.onSubmit === 'function') {
                var data = Array.from(inputs).reduce(function (callback, input) {
                    switch (input.type) {
                        case 'checkbox':
                            if( !Array.isArray(callback[input.name])){
                                callback[input.name] = [];
                            }
                            if(input.matches(':checked')){

                                callback[input.name].push(input.value);
                            }
                            break;
                        case 'radio':
                            var valueChecked = formElement.querySelector('[name="'+input.name+'"]:checked');
                            if(valueChecked){
                                callback[input.name] = valueChecked.value;
                            }
                            else{
                                callback[input.name] = '';
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
                _this.onSubmit(data);

            }
            else {
                formElement.submit();
            }
        }
    }



}