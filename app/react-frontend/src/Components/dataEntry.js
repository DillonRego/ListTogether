import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Form.css'

function DataEntry(props) {

  const [pics, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    items: [''],
    images: ['']
  });

  useEffect(() => {
    axios.get('http://localhost:5000/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleImageChange = (event) => {
    setFormData({ ...formData, images: event.target.value });
  }

  const handleTitleChange = (event) => {
    setFormData({ ...formData, title: event.target.value });
  };

  const handleItemChange = (index, event) => {
    const newItems = [...formData.items];
    newItems[index] = event.target.value;
    setFormData({ ...formData, items: newItems });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, ''] });
  };

  const handleDeleteItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(formData);
    setFormData({ title: '', items: [''], image: null });
  }

  return (
    <div>
      <h2>Task Library</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Control type="text" value={formData.title} onChange={handleTitleChange} placeholder="My Library Title"/>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Row>
            {pics.map((images) => (
              <Col key={images._id} xs={4}>
                <Form.Check
                  type="radio"
                  id={`image-${images._id}`}
                  name="image"
                  value={images._id}
                  checked={formData.images === images._id}
                  onChange={handleImageChange}
                  label={
                    <img
                      src={`data:${images.contentType};base64,${images.data}`}
                      alt={images.filename}
                      style={{ width: 100, height: 100, padding: "10px" }}
                    />
                  }
                />
              </Col>
            ))}
          </Row>
        </Form.Group>
        {formData.items.map((item, index) => (
          <Form.Group controlId={`item-${index}`} key={index}>
            <Form.Control type="text" value={item} onChange={(event) => handleItemChange(index, event)} placeholder="Task" />
            <Button variant="danger" type="button" onClick={() => handleDeleteItem(index)}>Delete</Button>
          </Form.Group>
        ))}
        <Button variant="primary" type="button" onClick={handleAddItem}>Add Item</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default DataEntry;
