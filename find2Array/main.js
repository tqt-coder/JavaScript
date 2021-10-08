Array.prototype.find2 = function(){
   var newObject = {};
    for(var  i = 0 ; i < this.length ; i++){
       var isResult = callBack( this[i] , i);
       if( isResult == true){
            return this[i];
       }
    }
    return undefined;
};
var Course =[

    {
        id: 1,
        name : 'Javascript',
        coin : 1,
    },
    
    {
        id: 2,
        name : 'PHP',
        coin : 2,
    },
    
    {
        id: 3,
        name : 'Python',
        coin : 3,
    },
    
    {
        id: 4,
        name : 'Ruby',
        coin : 4,
    },
];
function callBack(element , index){
    return element.id == 4;
}
/*var newObject = Course.find( function( Course , index){
    return Course.id == 10;
});
console.log(newObject);*/

var childObject = Course.find2();
console.log(childObject);
