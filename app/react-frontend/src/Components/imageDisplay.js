import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [images, setImages] = useState([]);
  const port = 5000;

  useEffect(() => {
    axios.get('http://localhost:' + port + '/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function deleteImage(id) {
    axios.delete('http://localhost:5000/images/' + id);
    window.location.reload(true);
  }

  return (
    <div>
      <h1>Image Gallery (click to delete)</h1>
      <div className="image-gallery">
        {images.map(image => (
          <button onClick={() => deleteImage(image._id)}>
          <img
            key={image._id}
            src={`data:${image.contentType};base64,${image.data}`}
            alt={image.filename}
            style={{width: 100, height: 100, margin: 5}}
          />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
