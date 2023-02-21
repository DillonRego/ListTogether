import React from 'react'

function TableHeader()  {
    return (
      <thead>
        <tr>
          <th>Task</th>
        </tr>
      </thead>
    );
}

function TableBody(props) {
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
  
  
  function Table (props) {
    return (
      <table>
        <TableHeader />
        <TableBody taskData={props.taskData} removeTask={props.removeTask} />
      </table>
    );
  }
 

export default Table;
