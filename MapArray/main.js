var inputs = [1, 'hi', false, 8, undefined, '', NaN];

function convertToBoolean(inputs) {
    function convertBool(input , index){
        return !!input;
    }
    var arrBoolean = inputs.map(convertBool);
    return arrBoolean;
}

console.log(convertToBoolean(inputs));

var _number = '5';
var _convertNumber = Object(_number);
console.log( typeof _convertNumber);
