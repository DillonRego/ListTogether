import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Library() {
  const [libraryData, setLibraryData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchLibraryData(id).then(result => {
      if (result) {
        setLibraryData(result);
      }
    });
  }, [id]);

  async function fetchLibraryData(_id) {
    try {
      const response = await axios.get(`http://localhost:5000/lists/${_id}`);
      console.log(response.data.tasks_list)
      return response.data.tasks_list;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  if (!libraryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{libraryData.title}</h2>
      <img src={libraryData.images[0]} alt={libraryData.title} />
      <ul className="items">
        {libraryData.items.map((item, i) => (
          <li key={i}>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
