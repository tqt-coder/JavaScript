var path = 'http://localhost:3000/student';
var createStudent = document.querySelector('.create-student');

function editHandler(id) {
    const del = document.querySelector('.delete-student-' + id);
    del.innerText = 'Save';
    var objectStudent = document.querySelector('.student.student-' + id);
    var inforStudent = data();
    inforStudent.name.value = objectStudent.querySelector('h2').innerText;
    inforStudent.img.value = objectStudent.querySelector('img').src;
    inforStudent.major.value = objectStudent.querySelector('p').innerText;



}
function handlerDelete(id) {
    const del = document.querySelector('.delete-student-' + id);
    if(del.innerText !== 'Save'){

        var parentInput = del.parentElement;
        var options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(path + "/" + id, options)
            .then((responsive) => responsive.json());
        parentInput.remove();
    }else{
        var information = data();
        information.name = information.name.value;
        information.major = information.major.value;
        information.img = information.img.value;
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(information)
        };
        fetch(path+"/"+id, options)
            .then((responsive) => responsive.json())
            .then(callback);
    }

}

function data() {
    var name, img, major;
    if (document.querySelector('input[name="name"]:not(:disabled)')) {
        name = document.querySelector('input[name="name"]:not(:disabled)');
    }
    if (document.querySelector('input[name="major"]:not(:disabled)')) {
        major = document.querySelector('input[name="major"]:not(:disabled)');
    }
    if (document.querySelector('input[name="img"]:not(:disabled)')) {
        img = document.querySelector('input[name="img"]:not(:disabled)');
    }
    var data = {};
    if (name && img && major) {
        data['name'] = name;
        data['major'] = major;
        data['img'] = img;

    }
    return data;
}
const app = function () {
    const userInfor = document.querySelector('.content');
    function start() {
        fetch(path)
            .then((responsive) => responsive.json())
            .then(callback);
    }
    function callback(users) {
        render(users);

    };
    // render code on UI
    function render(users) {
        var arrHtml = users.map(function (user , index) {
            console.log(index);
            return `<li class="student student-${user.id}">
                <h2>${user.name}</h2>
                <img src="${user.img}" alt="${user.name}">
                <p>${user.major}</p>
                <button class="delete-student-${user.id}" onclick="handlerDelete(${user.id})">Delete</button>
                <button class="edit-student" onclick="editHandler(${user.id})">edit</button>
                </li>`
        });

        const html = arrHtml.join('\n');
        userInfor.innerHTML = html;

    }



    function getStudent() {

        createStudent.onclick = function () {
            var information = data();
            information.name = information.name.value;
            information.major = information.major.value;
            information.img = information.img.value;
            console.log(information)
            // setStudent(information);
        };
        function setStudent(data) {

            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch(path, options)
                .then((responsive) => responsive.json())
                .then(callback);


        };
    };


    function handlerCode() {
        start();
        getStudent();

    }
    handlerCode();
}
app()
var infor = document.querySelector('.infor');
setTimeout(function () {
    infor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}, 1000);
