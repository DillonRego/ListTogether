import React, {useState} from 'react';

function DataEntry(props) {
  const [tasks, setTasks] = useState(
     {
        id: "",
        task: "",
     }
  );

  /* write  a function that will handle the change event */
    const handleChange = (e) => {
        setTasks({task: e.target.value});
    }

  /* write a submit function that will handle the submit event */
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(tasks);
        setTasks({task: ""});
        console.log(tasks);
    }

  return (
    <form>
      <label htmlFor="task">Task</label>
      <input
        type="text"
        value={tasks.task}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={handleSubmit} />
    </form>
);

}
export default DataEntry;