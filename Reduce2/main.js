
var kq = [1, 2, 3, 4].reduce2(function reducer(total, number) {
    return total + number 
   });
Array.prototype.reduce2 = function (accumulator , currentValue) {
    let i = 0 
    if( arguments.length < 2){
        i = 1;
        currentValue = this[0];
    }
    for( ; i < this.length ; i++){
       currentValue = accumulator(currentValue , this[i]) ;
        
    }
    return currentValue;
};

/*arrNumbers=[1,2,3,4,5]
var sumHandler = [1,2,3,4,5].reduce2(function abc(total , number){
    return total + number;
});*/
console.log(kq);