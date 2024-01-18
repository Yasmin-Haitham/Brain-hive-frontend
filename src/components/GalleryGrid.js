import React from "react";
import "../GalleryGrid.css";

// Example of importing local images
import logo from "../images/logo.png";

// ... import other images

const images = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo /*, other images */];

const GalleryGrid = () => {
  return (
    <div className='gallery-containers'>
      {images.map((image, index) => (
        <div key={index} className='gallery-item'>
          <img src={image} alt={`Infographic ${index + 1}`}  className="infographic"/>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
