import React, {useState, useEffect} from 'react';
import Form from './Form';
import DataEntry from './dataEntry';
import axios from 'axios';

function NewForm() {
    const [tasks, setTasks] = useState([]);
<<<<<<< HEAD
    const port = 5000;
=======
    const port = 5001;
>>>>>>> f4f85e5bcef2b609b3b366147c418467a3885f79

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
            setTasks(result);
         });
    }, []);

    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:' + port + '/tasks');
           return response.data.tasks_list;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
    }

    async function makePostCall(task){
        try {
           const response = await axios.post('http://localhost:' + port + '/tasks', task);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

    async function makeDeleteCall(id){
        console.log("makeDeleteCall: " + id);
        try {
           console.log("Sending request");
           const response = await axios.delete('http://localhost:' + port + '/tasks/' + id);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

    function removeOneTask(index) {
        const updated = tasks.filter((task, i) => {
          return i !== index
        });

        makeDeleteCall(tasks.at(index)._id).then( result => {
          if (result && result.status === 204)
          setTasks(updated);
        });
    }

    function updateList(task) { 
        console.log(task)
        makePostCall(task).then( result => {
        if (result && result.status === 201)
            setTasks([...tasks, result.data] );
        });
    }

    function changeTaskStatus(index) {
        let task = tasks[index];
        console.log(task);
        // CURRENTLY THIS DOES NOT WORK. I am not sure why the checkbox is not being updated. 
        // I have tried to use the spread operator to update the task, but it does not work.
        // I have tried to use the setTasks([...tasks]) to update the task, but it does not work.
        // I have tried to use the setTasks([...tasks, task]) to update the task, but it does not work.
        // However, the checkbox is updated on page reloads.
        axios.put('http://localhost:' + port + '/tasks/' + task._id, task).then( result => {
          if (result && result.status === 200)
            task.status = task.status === "0" ? "1" : "0";
            setTasks([...tasks]); 
        });

    }

    return (
        <div className="container">
          <Form taskData={tasks} removeTask={removeOneTask} changeTaskStatus={changeTaskStatus} />
          <DataEntry handleSubmit={updateList} />
        </div>
      )

    
}

export default NewForm;
