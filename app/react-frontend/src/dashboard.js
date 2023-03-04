import React from 'react';

function TableBody(props) {
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleClick = (index) => {
    if (selectedTask === index) {
      setSelectedTask(null);
    } else {
      setSelectedTask(index);
    }
  };

  const library = props.libraryData.map((task, index) => {
    const isActive = selectedTask === index;
    return (
      <div
        key={index}
        className={`card ${isActive ? "active" : ""}`}
        onClick={() => handleClick(index)}
      >
        <div
          className={`title ${isActive ? "active" : ""}`}
          style={{ color: isActive ? "red" : "blue" }}
        >
          {task.title}
        </div>
        {isActive && (
          <ul className="items">
            {task.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  });

  return <div className="Library">{library}</div>;
}


function Dashboard(props) {
  console.log(props.libraryData)
  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <TableBody libraryData={props.libraryData} />
      </table>
    </div>
  );
}

export default Dashboard;
