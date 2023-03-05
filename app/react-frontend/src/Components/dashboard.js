import React, { useState, useEffect } from 'react';
import axios from 'axios'

function TableBody(props) {
  const [selectedTask, setSelectedTask] = React.useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  var hasImage = 0;

  function getImage(id) {
    for (let i = 0; i < images.length; i++) {
      if (images[i]._id === id)
      {
        hasImage = 1;
        return images[i];  
      }
    }
    hasImage = 0;
    return ""
    
  }

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
              <li key={i}>{item}
                <img src={`data:${getImage(task.images[i]).contentType};base64,${getImage(task.images[i]).data}`} alt="" style={hasImage ? {width: 25, height: 25, marginLeft: 5} : {display: "none"}}/>
              </li>
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
