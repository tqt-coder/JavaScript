var objectUsers = [
    {
        id: 1,
        name: 'Trang Tran',
    },
    {
        id: 2,
        name: 'ad',
    },
    {
        id: 3,
        name: 'Kieu Tran',
    }
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: "Có video mới chưa anh ((",
    },
    {
        id: 2,
        user_id: 2,
        content: "Anh mới ra đó em",
    },
    {
        id: 3,
        user_id: 1,
        content: "em cảm ơn anh ^^",
    },
];


function getComments() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(comments);
        }, 1000);
    });
}
function getUsersByIds(userIds){
    return new Promise(function(resolve , reject){
        var result = objectUsers.filter(function(objectUsers){
            return userIds.includes(objectUsers.id);
        });
        setTimeout(function(){
            resolve(result);
        },1000);
    });
}

getComments()
    .then(function (comments) {
        var userArr = comments.map(function(comments){
            return comments.user_id;
        });
       
       return  getUsersByIds(userArr)
            .then(function(users){
               return {
                   users: users,
                   comments: comments, 
               };
            })
    })
    .then(function(data){
        var ulNode = document.querySelector('ul');
        var html = '';
        data.comments.forEach(function(comments){
           var userName = data.users.find(function(users){
               return users.id === comments.user_id;
           })
           html += `<li>${userName.name}: ${comments.content}</li>`;
        });
        ulNode.innerHTML = html;
    })

// kkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// var category = [
//     {
//         id: 1,
//         name : 'Vegetable'
//     },
//     {
//         id: 2,
//         name : 'meat'
//     }
// ];
// var items = [
    
//     {
//         id: 2,
//         category_id : 2,
//         cost: 150,
//     },
//     {
//         id: 3,
//         category_id : 1,
//         cost: 20,
//     },
// ];

// function getCost(){
//     return new Promise(function(resolve , reject){
//         setTimeout(function(){
//             resolve(items);
//         },1000)
//     });
// };
// function costById(arrCategoryId){
//     return new Promise(function(resolve , reject){
//         var products = category.filter(function(category){
//             return arrCategoryId.includes(category.id);
//         })
//         setTimeout(function(){
//             resolve(products);
//         },1000);
//     })
// }
// getCost()
//     .then(function(items){
//         var arrCategoryId = items.map(function(items){
            
//             return items.category_id;
//         });
//         return costById(arrCategoryId)
//                     .then(function( objectItems){
//                         return {
//                             category : category,
//                             item : items
//                         };
//                     })
//     })
//     .then(function(data){
//         var htmls = '';
//         var ulNode2 = document.querySelector('ul');
//         var product = data.item.forEach(function(item){
//             var nameItem = data.category.find(function(category){
//                 return category.id === item.category_id;
//             })
//             htmls = htmls +   `<li>${nameItem.name}: ${item.cost}</li>`;

//         });
//         ulNode2.innerHTML = htmls;
//     })