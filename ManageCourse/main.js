var path = "http://localhost:3000/courses";



function getCourse(callBack) {
    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(callBack)
        .catch(function () {
            console.log("There is error");
        });

};
function start() {
    getCourse(showResult);
    data();

}

start(); // run
function showResult(courses) {
    var arrHtml = courses.map(function (course) {
        return `
            <li class="list-items-${course.id}">
            <h3 class="h3-${course.id}">${course.name}</h3>
            <p class="p-${course.id}">${course.description}</p>
            <button class="change-${course.id}" onclick="handlerDeleteCourse(${course.id})">xóa</button>
            <button onclick="handlerPutCourse(${course.id})">sửa</button>
            </li>
        `
    })
    var html = '';
    html += arrHtml.join('\n');
    document.querySelector('.category').innerHTML = html;
}
function createCourse(data, callBack) {
    var opotion = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(path, opotion)
        .then(function (response) {
            return response.json();
        })
        .then(callBack)
}
function handlerPutCourse(id) {
    var change = document.querySelector('.change-' + id);
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');
    var h3Text = document.querySelector('.h3-' + id);
    var pText = document.querySelector('.p-' + id);
    name.value = h3Text.innerText;
    change.innerText ='lưu';
    description.value = pText.innerText;


}
function handlerSaveCourse(id) {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var form = {
        name: name,
        description: description,
    };
    var opotion = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }
    fetch(path + "/" + id, opotion)
        .then(function (response) {
            return response.json();
        })
        .then(callBack)
}
function handlerDeleteCourse(id) {
    var flag = document.querySelector('.change-' + id);
    if (flag.innerText === 'lưu') {
        handlerSaveCourse(id);
    }
    else {
        var opotion = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(path + "/" + id, opotion)
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                var kq = document.querySelector('.list-items-' + id);

                if (kq) {
                    kq.remove;
                }

            })
    }
}

function data() {
    var handler = document.querySelector('.create');
    handler.addEventListener('click', function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var form = {
            name: name,
            description: description,
        };
        createCourse(form);

    });


}





