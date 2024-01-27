import React, { useState } from "react";
import "../LearningStylesBar.css";

const LearningStylesBar = ({ onSelectStyle }) => {
  // State to keep track of the selected learning style
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleSelectStyle = (style) => {
    setSelectedStyle(style); // Update the state
    onSelectStyle(style); // Propagate the selection
  };

  return (
    <div className='LearningStylesBar'>
      {["Auditory", "Visual", "Read/Write", "Kinesthetic"].map((style) => (
        <button
          key={style}
          className={`nav-item ${selectedStyle === style ? "selected" : ""}`}
          onClick={() => handleSelectStyle(style)}>
          {style}
        </button>
      ))}
    </div>
  );
};

export default LearningStylesBar;
