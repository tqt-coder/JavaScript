var myPromise = new Promise(function(resolve , reject){
    resolve();
    
});
myPromise
    .then(function(){
        sleep(1000);
})
    .then(function(success){
        console.log(success);
        return 2;
    })
    .catch(function(error){
    console.log(error);
})
    .finally(function(){
        console.log('done')
    });
function sleep(ms){
    return new Promise( function(resolve){
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

sleep(1000).then(function(){
    console.log(1);
    return sleep(1000);
})
    .then(function(){
        console.log(2);
        return sleep(1000);
    })
    .then(function(){
        console.log(3);
    })