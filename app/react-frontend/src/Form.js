import React from 'react'

function FormHeader()  {
    return (
      <thead>
        <tr>
          <th><textarea type="text" placeholder="Enter List Name" class="table-title"/></th>
        </tr>
      </thead>
    );
}

function FormBody(props) {
    const rows = props.taskData.map((row, index) => {
      return (
        <tr key={index}>
            <td>{row.task}</td>
            {/* if the row.priority is high, use the exclamation-mark-red class */}
            <td><img src="exclamation-mark-inside-a-circle-svgrepo-com.svg" alt="exclamation mark" class={"exclamation-mark-" + row.priority}/></td>
            {/* add a checkbox that is checked if row.status is 1, but still give the user permission to select it. make sure this checkbox is changing accordingly */}
            <td><input id={row.id + "_checkbox"} type="checkbox" checked={row.status === "1"} onChange={() => props.changeTaskStatus(index)}/></td>
            
            {/* <td><input type="checkbox" checked={row.status === "1"} onChange={() => props.changeTaskStatus(index)}/></td> */}
            <td>
                <button onClick={() => props.removeTask(index)}>Delete</button>
            </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  
  
  function Form(props) {
    console.log(props.taskData)
    return (
      <table>
        <FormHeader />
        <FormBody taskData={props.taskData} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}/>
      </table>
    );
  }
 

export default Form;
