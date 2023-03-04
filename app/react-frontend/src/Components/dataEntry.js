import React, { useState } from 'react';

function DataEntry(props) {
  const [formData, setFormData] = useState({
    title: '',
    items: ['']
  });

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