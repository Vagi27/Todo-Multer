let textarea = document.getElementById("textarea");

let leftdiv = document.getElementById("leftdiv");

let tasks;
let counter = 0;
// =document.createElement("div");
// tasks.setAttribute("class","tasks");

function ontextchange() {

    if (window.event.keyCode === 13) {
        let obj = {
            id: counter++,
            value: textarea.value,
            checked: false,
            isdeleted: false
        };
        serverReach(obj, taskUpdate);
    }
}

function taskUpdate() {
    tasks = document.createElement("div");
    tasks.setAttribute("class", "tasks");
    tasks.innerText = textarea.value;
    textarea.value = "";

    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");

    let img = document.createElement("img");
    img.setAttribute("class", "image");
    img.setAttribute("src", "delete.png");
    img.addEventListener("onclick", imagelistener);

    tasks.appendChild(check);
    tasks.appendChild(img);
    leftdiv.appendChild(tasks);
}

function imagelistener(event){
    console.log(event);
}

function serverReach(object, callback) {
    let request = new XMLHttpRequest();
    request.open("post", "/addtodo");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(object));

    request.addEventListener("load", function () {
        if (request.status == 200) {
            callback();
        }


    });
}