var path = 'https://jsonplaceholder.typicode.com/posts';
fetch(path)
        .then(function(respon){
            return respon.json();
        })
        .then(function(post){
            var ulNode = document.getElementById('content');
            var newArr = post.map(function(category){
                return `<li>
                <h2>${category.title}</h2>
                <p>${category.body}</p> 
                </li>`
                
            });
            var html = newArr.join('');
            ulNode.innerHTML = html;
        })