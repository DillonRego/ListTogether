import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';
import Userfront from "@userfront/react";
import './Library.css'

function Library() {
  const [libraryData, setLibraryData] = useState(null);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const userData = Userfront.user;

  useEffect(() => {
    axios.get('http://localhost:5000/images')
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
      const response = await axios.get(`http://localhost:5000/lists/${_id}`);
      console.log(response.data.tasks_list)
      return response.data.tasks_list;
    } catch (error) {
      console.log(error);
      return null;
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

  if (!libraryData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleBack}>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image className='img-fluid'
          src={`data:${getImage(libraryData.image).contentType};base64,${getImage(libraryData.image).data}`} alt={libraryData.title} fluid />
        </Col>
        <Col md={6}>
          <h2 className='library-title'>{libraryData.title}</h2>
          <h3 className='username-title'>{userData.username}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr className='thead'>
                <th>#</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody >
              {libraryData.items.map((item, i) => (
                <tr key={i} className='tbody'>
                  <td>{i + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Library;
