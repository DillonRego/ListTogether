import React, { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import DataEntry from './dataEntry';
import axios from 'axios';

function NewForm() {
  const history = useNavigate();
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result) {
        setLibrary(result);
      }
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/lists');
      return response.data.libraryData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(item) {
    try {
      const response = await axios.post('http://localhost:5000/lists', item);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateLibrary(item) {
    makePostCall(item).then(result => {
      if (result && result.status === 201) {
        setLibrary([...library, result.data]);
      }
    });
    history('/dashboard');
    //window.location.href = '/dashboard';
  }

  return (
    <div className="container">
      <DataEntry handleSubmit={updateLibrary} />
    </div>
  );
}

export default NewForm;