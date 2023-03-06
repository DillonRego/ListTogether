const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Add mongdb user services
const taskServices = require("./models/task-services");

const app = express();
const port = 5001;
// const tasks = {
//     task_list: []
// }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tasks', async (req, res) => {
    // return all tasks
    try {
        const tasks_from_db = await taskServices.getTasks();
        res.send({ tasks_list: tasks_from_db });
    } catch (error) {
        console.log('Mongoose error: ' + error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await taskServices.findTaskById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else
        res.send({ tasks_list: result });
});

app.post("/tasks", async (req, res) => {
    console.log("received post request")
    console.log(req.body)
    const task = req.body;
    const savedTask = await taskServices.addTask(task);
    if (savedTask)
        res.status(201).send(savedTask);
    else 
        res.status(500).end();
});

app.delete("/tasks/:id", async (req, res) => {
    console.log("received delete request");
    const id = req.params["id"];
    console.log(id);
    if (deleteTaskById(id))
        res.status(204).end();
    else
        res.status(404).send("Resource not found.");
});

app.put("/tasks/:id", async (req, res) => {
    console.log("received put request");
    const id = req.params["id"];
    console.log(id);
    if (await taskServices.updateTask(id))
        res.status(204).end();
    else
        res.status(404).send("Resource not found.");
});

async function deleteTaskById(id) {
    try {
        if (await taskServices.deleteTask(id)) return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

app.listen(process.env.PORT || port, () => {
    if (process.env.PORT) {
        console.log(`REST API is listening on port: ${process.env.PORT}.`);
    } else console.log(`REST API is listening on port: ${port}.`);
}); 
