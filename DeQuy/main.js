function run(x, y) {
    const newArr = [];
     function arr( x , y){
     if( x < y-1){
         newArr.push(x+1)
         return arr(x+1 , y);
     }
     return 0 ;
 }
    arr(x,y);
   return  newArr;
 }

console.log(run(1,6))