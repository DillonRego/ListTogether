import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [images, setImages] = useState([]);
  const port = 5001;

  useEffect(() => {
    axios.get('http://localhost:' + port + '/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-gallery">
        {images.map(image => (
          <img
            key={image._id}
            src={`data:${image.contentType};base64,${image.data}`}
            alt={image.filename}
            style={{width: 100, height: 100, margin: 5}}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
