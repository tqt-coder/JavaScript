"use strict";
// function annouce(typeLog){
//     return function Logger(message){
//         console[typeLog](`[${typeLog}]: ${message}`);
//     }
// }
// var respon = annouce('warn');
// respon('kiểm tra email thành công')
// respon('gửi email đến user thành công')
// respon('user nhận thành công')

// function counter(){
//     var count = 0;
//     return function create(){
//         count ++;
//         console.log(count);
//     };
// }
// var create1 = counter();
// create1();
// create1();
// create1();
// var create2 = counter();
// create2();
// create2();
// create2();

// function closure
 /*------------------------------hosting-------------*/

function collectionCars (obj) {
    obj = JSON.parse(JSON.stringify(obj));
    obj.getName.fullName = 'Mecedes'
}

const car = {
    name : 'BMW',
    getName: {        
            fullName: 'Yamaha',
        
    }
}
collectionCars(car)
console.log(car.getName.fullName)

// let lastName = 'minh';
;(function infor(){
     let lastName = 'teo'
    console.log(lastName)
})()

