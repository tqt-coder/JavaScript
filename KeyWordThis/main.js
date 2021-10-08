"use strict";
// // vd1 bind
// const car = function(name, color , speed) {
//     this.name = name;
//     this.color = color;
//     this.speed = speed;
//     this.getInfor = function(){
//       console.log( `This car with name ${this.name}`);  
//     };
// }
// // this.name = 'Name car'
// const car1 = new car('Mecedes', 'Pink', 100);
// // const getName = car1.getInfor.bind(car1, 'value1' ,'value2');
// // console.log(getName())
// const button = document.querySelector('button');
// button.onclick = car1.getInfor.bind(car1)

// vd2 bind
const $ = document.querySelector.bind(document);
const app = (function(){
    const list = $('ul');
    const cars = ['BMW'];
    const input = $('.input__car:not(:disabled)');
    const button = $('button');
    return {
        add : function(name){
            cars.push(name);
        },
        edit(index , car){
            cars[index] = car;
        },
        remove(index ){
            cars.splice(index,1);
        },
        render(){
            const html = cars.map((car,index) => `
            <li>
            ${car}
            <span class="delete" data-index="${index}">&times</span>
            </li>
            `).join('\n')
            list.innerHTML = html;
        },
        init(){
            this.render();
            this.handlerCode();
        },
        deleteHandler(e){
            var del = e.target.closest('.delete');
            if(del){
                var index = Number(del.dataset.index);
                this.remove(index);
                this.render();
            }
        },
        handlerCode(){
            // const _this = this;
            button.onclick = ()=>{
                let nameCar = input.value;
                if(nameCar){
                    this.add(nameCar);
                    this.render()
                    input.value = null;
                    input.focus();
                }
            };
            list.onclick = this.deleteHandler.bind(this);
        },
    }
})()
app.init()