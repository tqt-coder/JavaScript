Array.prototype.map2 = function(){
    var newArr = [];
    for( var i = 0 ; i < this.length ; i++)
    {
        newArr.push(callBack(this[i], i));
    }
    return newArr;
};
Course = [
    'Javascript',
    'PHP',
    'Ruby'
];
function callBack( Course){
    return  `<h2>${Course}</h2>`;
}
var lastArr = Course.map2();
console.log(lastArr.join(''));