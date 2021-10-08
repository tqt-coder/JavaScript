function highLight([first,...arr],...rest){
    return rest.reduce((acc , cur) => [...acc, `<span>${cur}</span>`+arr.shift()]
    ,[first]);
}
var course = 'JavaScript';
var branch = 'F8';

var kq =highLight`Học lập trình ${course} tại ${branch}!`;
var html = kq.join('');
 document.querySelector('body').innerHTML = html
console.log(html);
import {logger2} from './loging/index.js';
import * as constantObject from './constants.js'
console.log(constantObject)
logger2('this is message', constantObject.typeWarn );

const obj = [{
    name: 'Alice',
    cat: {
      name: 'Dinah'
    }
  }];
  console.log(obj[0].cat?.name)