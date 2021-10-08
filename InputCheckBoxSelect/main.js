var textNode = document.querySelector('select');
console.log(textNode)
textNode.onchange = function(e) {
    console.log(e.target.value);
}
document.onkeyup = function(e) {
   var kq = e.which;
   switch(kq){
       case 27:
           console.log('Exit');
           break;
   }
};

document.querySelector('ul').onmousedown= function(e){
    e.preventDefault();
}
var liNodes = document.querySelectorAll('li');
for( var i=0 ; i< liNodes.length ; i++){
    liNodes[i].onclick= function(e){
        console.log(e.target);
    };
}

document.querySelector('div').onclick = function(e) {
    console.log('DIV');
}

document.querySelector('button').onclick = function(e) {
    e.stopPropagation();
    console.log('Click me');
}
