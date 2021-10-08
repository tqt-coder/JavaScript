var json = '[{"name": "tuan", "age" : 18},{"name": "teo", "age" :20}]';
var arrJson = JSON.parse(json);
for( var i in arrJson){
    console.log(typeof arrJson[i]);
}
console.log(JSON.parse(json));
console.log(typeof JSON.parse(json));

var stringClient = {name: 'tuấn' , age: 15};

console.log(JSON.stringify(stringClient));