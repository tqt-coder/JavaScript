Array.prototype.every2 = function() {
    for( var i = 0 ; i < this.length ; i++){
       var compare = callBack(this[i] ,i);
       if( compare === false ){
           return false;
       }
    }
    return true;
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
function callBack(element , index) {
    console.log( element.id)
    return element.coin  > 1;
};
/* var isBoolean = Course.every( function(Course , index) {
     console.log(index);
    return Course.coin >= 2;
 });*/
 var isBoolean = Course.every2();
 console.log( isBoolean);
