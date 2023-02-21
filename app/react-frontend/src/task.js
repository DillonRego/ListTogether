import React, {useState} from 'react';

const Task = () => {
    const [task, setTask] = useState({task: ""});
    /* add the ability to add a task. when this is do*/
    const handleChange = (e) => {
        setTask({task: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(task);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task.task} onChange={handleChange}/>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default Task;
