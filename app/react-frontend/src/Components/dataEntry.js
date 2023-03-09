import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={formData.title} onChange={handleTitleChange} />
        <label htmlFor="image">Image:</label>
        <div className="image-grid"style={{ display: "flex", flexDirection: "row"}}>
          {pics.map((images) => (
            <div key={images._id}>
              <input type="radio" id={`image-${images._id}`} name="image" value={images._id} checked={formData.images === images._id} onChange={handleImageChange} />
              <label htmlFor={`image-${images._id}`}>
                <img src={`data:${images.contentType};base64,${images.data}`} alt={images.filename} style={{width: 100, height: 100, padding: "10px"}} />
              </label>
            </div>
          ))}
        </div>
        {formData.items.map((item, index) => (
          <div key={index}>
            <label htmlFor={`item-${index}`}>Item:</label>
            <input type="text" id={`item-${index}`} value={item} onChange={(event) => handleItemChange(index, event)} />
            <button type="button" onClick={() => handleDeleteItem(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DataEntry;
