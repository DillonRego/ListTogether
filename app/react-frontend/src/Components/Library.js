import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard';
import axios from 'axios';

function Library(props) {
  const [libraryData, setLibraryData] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result) {
        setLibraryData(result);
      }
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data.tasks_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <Dashboard libraryData={libraryData} />
    </div>
  );
}

export default Library;
