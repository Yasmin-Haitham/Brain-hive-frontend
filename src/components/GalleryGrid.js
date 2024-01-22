import React from "react";
import "../GalleryGrid.css";

// Example of importing local images
import logo from "../images/logo.png";


const images = [logo];

const GalleryGrid = ({images}) => {
  return (
    <div className='image-container'>
      <img src={images} />
    </div>
  );
};

export default GalleryGrid;
