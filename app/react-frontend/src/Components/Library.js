import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';
import ExclamationMark from '../Icons/exclamation.js';
//import Userfront from "@userfront/react";
import './Library.css'

function Library() {
  const [libraryData, setLibraryData] = useState(null);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const port = 5000;
  const shareURL = window.location.href;

  useEffect(() => {
    axios.get('http://localhost:' + port + '/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchLibraryData(id).then(result => {
      if (result) {
        setLibraryData(result);
      }
    });
  }, [id]);

  async function fetchLibraryData(_id) {
    try {
      const response = await axios.get(`http://localhost:` + port + `/lists/${_id}`);
      console.log(response.data.tasks_list)
      return response.data.tasks_list;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function deleteLibrary(_id) {
    try {
      const response = await axios.delete(`http://localhost:5000/lists/${_id}`);
      if (response.status === 204) {
        handleBack();
      }
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function getImage(id) {
    for (let i = 0; i < images.length; i++) {
      if (images[i]._id === id) {
        return images[i];
      }
    }
    return "";
  }

  function handleBack() {
    history('/dashboard');
  }

  // create a handler that, when the status checkbox is clicked, updates the status in the database by initiating a post request
  function handleStatusChange(index) {
    let newStatus = [...libraryData.status];
    newStatus[index] = newStatus[index] === "0" ? "1" : "0";
    setLibraryData({...libraryData, status: newStatus});
    axios.post(`http://localhost:` + port + `/lists/${id}/`, {status: newStatus})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
  });

  function handleDelete() {
    deleteLibrary(id);
  }

  if (!libraryData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleBack}>Back</Button>
        </Col>
        <Col>
          <Button className="float-end" variant="primary">Edit</Button>
          <Button className="float-end ms-2" variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image className='img-fluid'
            src={`data:${getImage(libraryData.image).contentType};base64,${getImage(libraryData.image).data}`} alt={libraryData.title} fluid />
        </Col>
        <Col md={6}>
          <h2 className='library-title'>{libraryData.title}</h2>
          <h3 className='username-title'>username</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr className='thead'>
                <th>#</th>
                <th>Item</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              {libraryData.items.map((item, i) => (
                <tr key={i} className='tbody'>
                  <td>{i + 1}</td>
                  <td>{item}</td>
                  <td><ExclamationMark className={"exclamation-mark-" + libraryData.priority[i]}/></td>
                  <td class = "checkbox-rect">
                    <input id={libraryData.status[i] + "_checkbox"}  type="checkbox" checked={libraryData.status[i] === "1" }  onClick = {() => handleStatusChange(i)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row >
      <Col>
        <Button onClick={() => navigator.clipboard.writeText(shareURL)}>Share</Button>
      </Col>
    </Container>
  );

}

export default Library;
