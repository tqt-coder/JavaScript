var Courses = [
    {
        id: 1,
        name: 'javascript',
        coin: 0,
    },
    {
        id: 2,
        name: 'hmtl',
        coin: 0,
    },
    {
        id: 3,
        name: 'php',
        coin: 0,
    },
    {
        id: 4,
        name: 'python',
        coin: 1,
    },
];
var kq = {

};
console.log(typeof kq);
Courses.forEach( function(Courses , index){
    kq[Courses.coin] = Courses.name;
 });
 console.log(kq);
 var isCheckCoin = Courses.every(function(Courses , index) {
    console.log(Courses) ;
 });
 console.log( isCheckCoin);


 var isFind = Courses.filter( function (Courses ,index){
    return Courses.name.indexOf('python') !== -1;
 });
 console.log( isFind);

  function findStringsInArrayByKeyword(keyword, strings) {
    var arr = [];
  


    return arr;

}

var result = findStringsInArrayByKeyword('P',['Javascript', 'PHP', 'Học PHP']);
console.log(result)