
let textarea = document.getElementById("textarea");

let leftdiv = document.getElementById("leftdiv");

let task;
let counter = 0;
let obj;
// let check;

//function call where taskAppender function is passed as an arguement
InitialReceiveFromServer(taskAppender);

function taskAppender(objects) {
    console.log("in task appender");
    console.log(objects);
    for (key in objects) {


        let task = document.createElement("div");
        task.setAttribute("class", "task");
        task.setAttribute("id", objects[key].filename);
        // task.id=objects[key].id;

        // console.log( "This is in task appender:-  ", task.id, typeof task.id);
        // console.log( "This is in task appender:-  ",objects[key].id, typeof objects[key].id)
        // counter = objects[key].id + 1;
        // task.innerText = textarea.value;
        let label = document.createElement("label");
        label.setAttribute("class", "label");
        label.innerText = objects[key].task;
        // textarea.value = "";
        // textarea.placeholder = "I need to...";

        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "checkbox");

        if (objects[key].ischecked === true) {
            label.style.textDecoration = "line-through";
            check.checked = true;
        }
        // else {
        //     check.checked = false;
        // }

        check.addEventListener("click", checkToggler);

        let taskimg = document.createElement("img");
        taskimg.setAttribute("class", "taskimage");
        taskimg.setAttribute("src", objects[key].filename);

        let img = document.createElement("img");
        img.setAttribute("class", "image");
        img.setAttribute("src", "delete.png");
        img.addEventListener("click", deleteimagelistener);

        task.appendChild(label);
        task.appendChild(taskimg);
        task.appendChild(check);
        task.appendChild(img);
        leftdiv.appendChild(task);
    }
}

// function ontextchange() {

//     if (window.event.keyCode === 13) {
//         obj = {
//             id: counter,
//             value: textarea.value,
//             ischecked: false,
//             isdeleted: false
//         };
//       //  counter++;
//         serverReach(obj, taskUpdate);
//     }
// }


function deleteimagelistener(event) {
    // console.log(event);

    let request = new XMLHttpRequest();
    request.open('post', '/remove');
    request.setRequestHeader('Content-Type', 'application/json');

    let elementId = event.target.parentNode.id
    console.log("inside remove script");
    console.log(elementId);
    request.send(JSON.stringify({ id: elementId }));
    // console.log(elementId);
    // console.log(typeof elementId,"this is in client side");
    request.addEventListener("load", function () {

    })

    let div = document.getElementById(elementId);
    leftdiv.removeChild(div);


}

// function serverReach(object, callback) {
//     let request = new XMLHttpRequest();
//     request.open("post", "/addtodo");
//     request.setRequestHeader("Content-Type", "application/json");
//     request.send(JSON.stringify(object));

//     request.addEventListener("load", function () {
//         if (request.status == 200) {
//             callback();
//         }
//     });
// }



//alternate to taskupdate function

// function taskUpdate() {

//     // let request.

//     let task = document.createElement("div");
//     task.setAttribute("class", "task");
//     task.setAttribute("id", counter);
//     counter++;
//     // task.innerText = textarea.value;
//     let label = document.createElement("label");
//     label.setAttribute("class", "label");
//     label.innerText = textarea.value;
//     textarea.value = "";
//     textarea.placeholder = "I need to...";

//     let check = document.createElement("input");
//     check.setAttribute("type", "checkbox");
//     check.setAttribute("class", "checkbox");
//     check.addEventListener("click", checkToggler);

//     let img = document.createElement("img");
//     img.setAttribute("class", "image");
//     img.setAttribute("src", "delete.png");
//     img.addEventListener("click", deleteimagelistener);

//     task.appendChild(label);
//     task.appendChild(check);
//     task.appendChild(img);
//     leftdiv.appendChild(task);
// }




function InitialReceiveFromServer(callback) {
    let request = new XMLHttpRequest();
    request.open("get", '/getdata');
    request.send();

    request.addEventListener("load", function () {
        callback(JSON.parse(request.responseText));
    })
}



function checkToggler(event) {

    //   console.log(event.target.parentNode.id);
    let request = new XMLHttpRequest();
    request.open("post", '/toggle');
    request.setRequestHeader('Content-Type', 'application/json');
    let elementId = event.target.parentNode.id
    request.send(JSON.stringify({ id: elementId }));

    request.addEventListener("load", function () {

        let array = JSON.parse(request.responseText);

        console.log('inside toggle script');
        console.log(array);
        for (key in array) {
            if (array[key].filename == elementId) {
                if (array[key].ischecked === true) {
                    // console.log("aaa")
                    event.target.previousSibling.previousSibling.style.textDecoration = "line-through";
                }
                else {
                    event.target.previousSibling.previousSibling.style.textDecoration = "";
                }
            }
        }
    })





    // let ob;

}
