import React from "react";
import "../GalleryGrid.css";

// Example of importing local images
import logo from "../images/logo.png";


const images = [logo];

const GalleryGrid = ({src}) => {
  return (
    <div className='image-container'>
      <img src={logo} />
    </div>
  );
};

export default GalleryGrid;
