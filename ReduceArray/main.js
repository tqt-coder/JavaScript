var Course =[
    {
        id: 1,
        name : 'javascript',
        coin : 0,
    },
    {
        id: 2,
        name : 'javascript',
        coin : 100,
    },
    {
        id: 3,
        name : 'javascript',
        coin : 300,
    },
    {
        id: 4,
        name : 'javascript',
        coin : 500,
    },
    {
        id: 5,
        name : 'javascript',
        coin : 50,
    }

];
var i = 0;
function sumCoin( accumulator , currentValue , currentIndex , originArray){
    var total = accumulator + currentValue.coin;
    console.table({
        'vị trí: ': currentIndex,
        'lưu trữ: ': accumulator,
        'giá: ': total,
    });
    i++;
    return total;
}
var result = Course.reduce(sumCoin , 0);
console.log(result);



