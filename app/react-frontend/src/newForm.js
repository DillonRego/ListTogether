import React, {useState, useEffect} from 'react';
import Form from './Form';
import DataEntry from './dataEntry';
import axios from 'axios';

function NewForm() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
            setTasks(result);
         });
    }, []);

    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5000/tasks');
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
           const response = await axios.post('http://localhost:5000/tasks', task);
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
           const response = await axios.delete('http://localhost:5000/tasks/' + id);
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
        makePostCall(task).then( result => {
        if (result && result.status === 201)
            setTasks([...tasks, result.data] );
        });
    }

    return (
        <div className="container">
          <Form taskData={tasks} removeTask={removeOneTask} />
          <DataEntry handleSubmit={updateList} />
        </div>
      )

    
}

export default NewForm;
