import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataEntry(props) {
  const [formData, setFormData] = useState({
    title: '',
    items: [''],
    images: ['']
  });

  const [pics, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  const handleImageChange = (index, identifier) => {
    const newImages = [...formData.images];
    newImages[index] = identifier;
    setFormData({ ...formData, images: newImages });
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
    formData.images.splice(index, 1);

    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(formData);
    setFormData({ formData: "" });
    console.log(formData);
  }

  return (
    <div>
      <h2>Task Library</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={formData.title} onChange={handleTitleChange} />
        {formData.items.map((item, index) => (
          <div key={index}>
            <label htmlFor={`item-${index}`}>Item:</label>
            <input type="text" id={`item-${index}`} value={item} onChange={(event) => handleItemChange(index, event)} />
            
            <div>
             {pics.map((image) => (
                  <button type = "button" value={image._id} onClick={(event) => handleImageChange(index, image._id)}> 
                    <img src={`data:${image.contentType};base64,${image.data}`} alt={""} style={{width: 50, height: 50}} />
                  </button>
             ))}
            </div>

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