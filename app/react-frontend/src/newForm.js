import React, {useState, useEffect} from 'react';
import Form from './form';
import DataEntry from './dataEntry';
import axios from 'axios';

function NewForm() {
    const [tasks, setTasks] = useState([]);

    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5001/tasks');
           return response.data.task_list;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
    }

    async function makePostCall(task){
        try {
           const response = await axios.post('http://localhost:5001/tasks', task);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

    async function makeDeleteCall(task){
        console.log("makeDeleteCall: " + task['id']);
        try {
           const taskId = task['id'];
           console.log("Sending request");
           const response = await axios.delete('http://localhost:5001/tasks/' + taskId, task);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

    function removeOneTask (index) {
        console.log("removing one task")
        makeDeleteCall(tasks[index]).then( result => {
            if (result && result.status === 204){
                setTasks(tasks.filter((task, i) => {
                    return i !== index
                }));
            }
        });
    }

    function updateList(task) { 
        makePostCall(task).then( result => {
        if (result && result.status === 201)
            setTasks([...tasks, result.data] );
        });
    }

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
            setTasks(result);
         });
    }, [] );

    return (
        <div className="container">
          <Form taskData={tasks} removeTask={removeOneTask} />
          <DataEntry handleSubmit={updateList} />
        </div>
      )

    
}

export default NewForm;
