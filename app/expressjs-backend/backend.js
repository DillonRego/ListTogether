const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const tasks = { 
    task_list :[]
 }

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
    // return all tasks
    res.send(tasks);

});

app.get('/tasks/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findTaskByid(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


app.post('/tasks', (req, res) => {
    console.log("received post request")
    const taskToAdd = req.body;
    taskToAdd['id'] = generateId();
    addUser(taskToAdd);
    console.log(tasks);
    res.status(201).send(taskToAdd).end();
});

app.delete('/tasks/:id', (req, res) => {
    console.log("received delete request");
    const id = req.params['id']; 
    console.log(id);
    console.log(tasks)
    let result = findTaskByid(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteTask(id);
        res.status(204).end();
    }
});

function deleteTask(id){
    tasks['task_list'] = tasks['task_list'].filter( (task) => task['id'] !== id);
}

function addUser(task){
    tasks['task_list'].push(task);
}

function findTaskByid(id) {
    return tasks['task_list'].filter( (task) => task['id'] === id);
}

function generateId() {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    for (let i = 0; i < 3; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    for (let i = 0; i < 3; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return id;
}

const findTaskByName = (name) => { 
    return tasks['task_list'].filter( (task) => task['task'] === name); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  
