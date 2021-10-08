const app = ( function(){
    const cars = [];
    return {
        get: function(index){
            return cars[index];
        },
        add: function (car) {
            cars.push(car);
        },
        edit: function (car, index) {
            cars[index] = car;
        },
        delete: function (index) {
            cars.splice(index, 1);
        }
    }
})();
