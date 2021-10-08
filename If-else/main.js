var date = 4;
if( date === '3'){
    console.log('true');
}
var a = 3.6;
var kq = Number.isInteger(a) == true ? a : Math.floor(a)
console.log(kq);

var hocVien = {
    name : 'Tuan',
    Age: 18,
    address : 'Cu Chi',
};

for( var key  in hocVien){
    console.log( hocVien[key] );
}
var st = "JavaScript";
for( var key in st){

    console.log(st[key]);
}