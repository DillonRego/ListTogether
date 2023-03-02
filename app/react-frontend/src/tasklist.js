import React, {useState} from 'react';

const TaskList = () => {
    const [taskslist, setTasks] = useState({tasks: {}});
    /* add the ability to add a task. when this is do*/
    const handleChange = (e) => {
        setTasks({tasks: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(TaskList);
    }
}