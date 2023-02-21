import React, {useState} from 'react';

const Task = () => {
    const [tasks, setTasks] = useState({task: ""});
    /* add the ability to add a task. when this is do*/
    const handleChange = (e) => {
        setTasks({tasks: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tasks);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={tasks.task} onChange={handleChange}/>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default Task;
