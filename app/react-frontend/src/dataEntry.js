import React, {useState} from 'react';

function DataEntry(props) {
  const [newTask, setTasks] = useState(
     {
        id: "",
        task: "",
        priority: "",
        status: "0",
     }
  );

  /* write  a function that will handle the change event */
    const handleTaskChange = (e) => {
      setTasks({task: e.target.value, priority: newTask.priority, status: "0"});
    }
    
    const handlePriorityChange = (e) => {
      setTasks({task: newTask.task, priority: e.target.value, status: "0"});
    }

  /* write a submit function that will handle the submit event */
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(newTask);
        setTasks({task: "", priority: "", status: "0"});
        document.getElementById("prioritySelection").value = "none";
    }

  return (
    <form>
      <div>
        <label htmlFor="task">New Task</label>
        <input type="text" placeholder="Enter Task Name" value={newTask.task} class="taskInput" onChange={handleTaskChange} />
        <label htmlFor="task">Select a Priority</label>
        <select id="prioritySelection" onChange={handlePriorityChange}>
            <option value="none">Select A Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
      </div>
        <input type="button" value="Submit" class="taskSubmit" onClick={handleSubmit} />
    </form>
);

}
export default DataEntry;