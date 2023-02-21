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
        <FormBody taskData={props.taskData} removeTask={props.removeTask} />
      </table>
    );
  }
 

export default Form;
