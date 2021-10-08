
let b = 'Javascript'
const a = ` học lập trình
<h2>java</h2>
<h2>java</h2>
${b}`;

console.log(a)
var sum = (a,b) => a+b;
console.log(sum(2,4));
var Courses = function(name , description) {
    this.name = name;
    this.description = description;
    this.getName =  ()=>  this.name + ': '+ this.description;

}
const course1 = new Courses('javascript', 'javascript basic!');
console.log( course1.getName());
const filedName = 'tuan';
const filedAge = '15';
const newObject = { 
    filedName, //enhandced object literal
    filedAge
};
console.log(newObject);
// destructuring
var arr = ['Javascript', 'PHP', 'Ruby'];
var [a1,...rest] = arr; // ...rest phần còn lại
console.log(a1 );
console.log(rest)
// object
var course = {
    name: 'Javascript',
    coin : 1000,
    description: 'học lập trình Javascript',
    coin1 : 200,
}
var {name: name1,coin1 ='default value', ...arrCourse} = course; // default value xuất hiện khi không có giá trị trong một object
console.log(name1);
console.log(coin1)

var logging = (...params) => params;
console.log(logging(1,2,46,7));
//spread
var apiCourse = ['Javascript', 'PHP','HTML'];
var apiCost = [1000 , 200 , 300]; 
var result = [...apiCourse , ...apiCost];
console.log(result);
 var khoaHoc  = ['Javascript' , 'PHP' , 'Python','Ruby'];
 function logger(...params){
     params.forEach((arr) => console.log(arr));
 }
 logger(...khoaHoc);