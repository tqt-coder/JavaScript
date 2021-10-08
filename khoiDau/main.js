var langues = [
    'Java',
    'PHP',
    'Javascipt',
];
var langues2 = ['Ruby'];

//pop() delete final element
// console.log(langues.push('Ruby','Dark'));
//     // push() add elements in finally array
// console.log(langues.shift());
// console.log(langues.shift());
// console.log(langues.shift());
// console.log(langues.shift());
        // shift() delete first element
// console.log(langues.unshift('Dark','Html',['string']));
        // unshift() add elements in first array
// console.log(langues.splice(0, 4,'Dark'));
        // splice copy, insert, delete
// console.log(langues.slice(0));
        // slice copy elements array
// console.log( langues.splice( 1,2, 'Dark','ruby'));
// console.log(langues.concat(langues2));
// function sum( a,b) {
//         if( (Number.isFinite(a) == true) && (Number.isFinite(b) == true)){
//             return a+b;
//         }
//         else{
//             return false;
//         }
//     }
// var kq = sum( 5, '56');
// console.log(kq);
function stringToString( a, b) {
        var l = a.indexOf(b);
        if( l >= 0)
        {
                return true;
        }
        else{
                return false;
        }
}
console.log(stringToString('abc','m'));
var email = 'gmail';
var infor ={
        name : 'Tuan',
        age : 20,
        address : 'HCM',
        [email] : 'tranquoctuan31012001@gmail.com'
};
// infor['email-m'] = 'tranquoctuan31012001@gmail.com';
var tuoi = 'age';
infor['age'] = 100;
console.log( infor);