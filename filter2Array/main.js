Array.prototype.filter2 = function(){
    var newArr = [];
    for( var i in this){
        if( this.hasOwnProperty(i)){
            var isResult = callBack( this[i] , i);
            if( isResult == true){
                newArr.push(this[i]);
            }
        }
    }
    return newArr;
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
Course.length = 1000;
function callBack(Course , index){
    return Course.coin < 0;
};
var childObject = Course.filter2( );
console.log(childObject);
