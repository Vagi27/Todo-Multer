const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(express.json());

app.get('/', (req, res) => {
    // console.log("asdf");
    // res.end('Hello World!');
    res.sendFile(__dirname + '/index.html');

});

// app.post('/task', upload.single('taskimage'), (req, res) => {
//     console.log(req.file);
//     res.redirect('/');
// });

app.post('/addtodo', upload.single('taskimage'), (req, res) => {

    let todos;
    fs.readFile('./data.txt', 'utf-8', function (error, data) {
        if (data.length === 0) {
            todos = [];
        }
        else {
            todos = JSON.parse(data);
        }
        let obj = {
            filename: req.file.filename,
            // path: req.file.path,
            task: req.body.tasktext,
            ischecked: false,
        }
        // console.log(req.body.tasktext);
        // console.log(req.file);

        todos.push(obj);

        fs.writeFile('./data.txt', JSON.stringify(todos), function (error) {
            res.redirect('/');
        });
    });

});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


app.get('/getdata', (req, res) => {
    let todos;
    fs.readFile('./data.txt', 'utf-8', function (error, data) {
        if (data.length === 0) {
            todos = [];
        }
        else {
            todos = JSON.parse(data);
        }
        // todos.push(req.body);

        res.json(todos);
    });
});


app.post('/toggle', (req, res) => {
    fs.readFile('./data.txt', 'utf-8', function (error, data) {
        // let id=JSON.parse(req.body.id);
        // console.log("inside toggle");
        
        let id = req.body.id;
        // console.log(id);
        // console.log(id);
        let todos = JSON.parse(data);

        todos.forEach(function (singletodo) {
            if (singletodo.filename == id) {
                if (singletodo.ischecked === true) {
                    singletodo.ischecked = false;
                    // console.log("int");
                }
                else {
                    // console.log("inf");
                    singletodo.ischecked = true;
                }
            }
        });
        fs.writeFile('./data.txt', JSON.stringify(todos), function (error) {
            res.json(todos);
        });

    });
    // res.redirect('/');
});


app.post('/remove', (req, res) => {
    fs.readFile('./data.txt', 'utf-8', function (error, data) {
        // console.log("inside remove");
        // console.log(req.body);
        let id = req.body.id;
        // console.log(id);
        // console.log(typeof id);

        let todos = JSON.parse(data);

        let newArray = todos.filter(function (eachtodo) {
            return eachtodo.filename != id;

        })

        fs.writeFile('./data.txt', JSON.stringify(newArray), function (error) {
            res.redirect('/');
        });
    })
});