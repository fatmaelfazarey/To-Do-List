let black = '#252525';
let white = '#F7F7F7';
let main = '#6C63FF';

let body = document.querySelectorAll('body')[0];
let blur = document.querySelectorAll('.blur')[0];
let newTaskWindow = document.querySelectorAll('.newTask')[0];
let content = document.querySelector('#content');
let search;
let tasks = [];

getFromLocalSto();

if (localStorage.backgroundColor) {
    body.style.backgroundColor = localStorage.backgroundColor;
    newTaskWindow.style.backgroundColor = localStorage.backgroundColor;
    localStorage.backgroundColor === black ? body.style.color = white : body.style.color = black;
}

function changeMode() {
    let mode = black;

    if (localStorage.backgroundColor && localStorage.backgroundColor == black) {
        mode = white;
        localStorage.setItem("backgroundColor", mode);
        body.style.backgroundColor = localStorage.backgroundColor;
        newTaskWindow.style.backgroundColor = localStorage.backgroundColor;
        body.style.color = black;
    }
    else if (localStorage.backgroundColor && localStorage.backgroundColor == white) {
        mode = black;
        localStorage.setItem("backgroundColor", mode);
        body.style.backgroundColor = localStorage.backgroundColor;
        newTaskWindow.style.backgroundColor = localStorage.backgroundColor;
        body.style.color = white;
    }

    localStorage.setItem("backgroundColor", mode);
    body.style.backgroundColor = localStorage.backgroundColor;
    newTaskWindow.style.backgroundColor = localStorage.backgroundColor;
    mode === black ? body.style.color = white : body.style.color = black;
}

function newTask() {
    blur.style.display = 'block';
}

function closeNweTaskWindow() {
    blur.style.display = 'none';
}

function createNewTask() {
    closeNweTaskWindow();
    getInputValue();
}

function getInputValue() {
    let mainTask = document.querySelector('#mainTask');
    let date = document.querySelector('#date');

    if (mainTask.value != "") {
        let dateValue = date.value;
        date.value != "" ? dateValue = dateValue.replace('T', ' ') : "";

        eachTask = {
            value: mainTask.value,
            deadline: dateValue,
            completed: false,
            id: Date.now()
        }

        tasks.push(eachTask);
        addToLoacalSto(tasks);
        mainTask.value = "";
        date.value = "";
        addToHtml(tasks);
    }
    else {
        alert("Enter Task Name");
    }

}
function addToHtml(tasks, select = 'All', status = '') {
    content.innerHTML = "";

    tasks.forEach(element => {
        if (select === 'All') {
            createHtmlTags(element);
        }
        else if (select = 'Complete' && element.completed == status) {
            createHtmlTags(element);
        } else if (select = 'Incomplete' && element.completed == status) {
            createHtmlTags(element);
        }
    });
    if (content.innerHTML == "") {
        addEmptyImage();
    }
}

function createHtmlTags(element) {
    let task = document.createElement('div');
    task.setAttribute('class', 'task');

    let taskContent = document.createElement('div');
    taskContent.setAttribute('class', 'text');

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = element.value;
    checkbox.value = element.value;
    checkbox.setAttribute('class', 'checkTask');

    let label = document.createElement('label');
    label.setAttribute('class', 'labelTask');
    label.appendChild(document.createTextNode(element.value));

    let span = document.createElement('span');
    span.setAttribute('class', 'data');
    span.appendChild(document.createTextNode(element.deadline));
    label.appendChild(span);

    taskContent.appendChild(checkbox);
    taskContent.appendChild(label);
    task.appendChild(taskContent);

    let taskIcons = document.createElement('div');
    taskIcons.setAttribute('class', 'icons');

    let check = document.createElement('i');
    check.setAttribute('class', 'fa-regular fa-circle-check');
    check.id = element.id;

    taskIcons.appendChild(check);

    let trash = document.createElement('i');
    trash.setAttribute('class', 'fa-regular fa-trash-can');
    trash.id = element.id;

    taskIcons.appendChild(trash);
    task.appendChild(taskIcons);

    content.appendChild(task);

    if (element.completed) {
        task.style.opacity = ".5";
        task.setAttribute('class', 'task done');
        checkbox.checked = true;
    }
    try {
        if (element.value == search.value) {
            task.style.boxShadow =
                '#6c63ffb0 0px 0px 0px 2px, #6c63ffb0 0px 7px 6px -1px, #6c63ffb0 0px 1px 0px inset';
            search.value = '';
        }
    } catch {

    }



}
function addEmptyImage() {
    let img = document.createElement('img');
    img.setAttribute('src', 'Detective-check-footprint 1.png');
    img.setAttribute('class', 'remove');
    content.appendChild(img);

    let p = document.createElement('p');
    p.setAttribute('class', 'remove');
    p.appendChild(document.createTextNode('Empty...'));
    p.style.fontSize = '18px';
    p.style.fontWeight = '200';

    content.appendChild(p);
}

function removeEmptyImg() {
    let emptyImg = document.querySelectorAll('.remove');
    emptyImg.forEach(element => {
        element ? element.remove() : console.log("nor");
    });
}

function selectValue() {
    let selectValue = document.querySelector('#lest').value;
    switch (selectValue) {
        case 'All': addToHtml(tasks);
            break;
        case 'Complete': addToHtml(tasks, 'Complete', true);
            break;
        case 'Incomplete': addToHtml(tasks, 'Incomplete', false);
            break;
    }
}

function addToLoacalSto(ArrayOfTasks) {
    localStorage.setItem("Tasks", JSON.stringify(ArrayOfTasks));
}

function getFromLocalSto() {
    if (localStorage.Tasks) {
        tasks = JSON.parse(localStorage.Tasks);
        addToHtml(tasks);
    }
}

document.addEventListener("click", function (e) {
    // Delet Task
    if (e.target.className == "fa-regular fa-trash-can") {
        let allTasksInLocalSt = JSON.parse(localStorage.Tasks);
        let deletTask = allTasksInLocalSt.filter(function (el) {
            return el.id != e.target.id;
        });
        addToHtml(deletTask);
        addToLoacalSto(deletTask);
    }
    // completed Task
    if (e.target.className == "fa-regular fa-circle-check") {
        let allTasksInLocalSt = JSON.parse(localStorage.Tasks);
        let doneTask = allTasksInLocalSt.filter(function (el) {
            return el.id == e.target.id;
        });
        console.log(doneTask);
        doneTask[0].completed = true;
        addToHtml(allTasksInLocalSt);
        addToLoacalSto(allTasksInLocalSt);
    }
});

function searchList() {
    search = document.querySelector('#searchBox');
    search.value != '' ? addToHtml(tasks) : "";
    search.value = "";
}
