var date = new Date();

console.log(date);
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
console.log(`${day}/${month}/${year}`);
 var currentDay = date.getDay() + 1 ;
 console.log(currentDay);
 var newDate = new Date();
 newDate.setUTCMonth(8);
 newDate.setDate(12);
 newDate.setFullYear(2021);
 console.log(newDate.getMonth());