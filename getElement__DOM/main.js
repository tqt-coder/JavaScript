document.write('Document Object Model');
var id1 = document.getElementById('heading');
console.log(id1);

var eleClass = document.getElementsByClassName('headingClass');
console.log(eleClass[2]);
var tagClass = document.querySelector('p');
console.log(tagClass);

var headingNode = document.querySelector('.heading__nav .heading__nav_content:nth-child(2n+1)');
console.log(headingNode);
var navNode = document.querySelector('.heading__nav');
// setInterval(() => {
//     tagClass.classList.toggle('red-color');
// },1000);
setTimeout(() => {

},1000);
console.log([navNode]);

for( var i = 0 ;i< eleClass.length; i++)
{
    eleClass[i].onclick = function(e) {
        console.log(e);
    }
}
