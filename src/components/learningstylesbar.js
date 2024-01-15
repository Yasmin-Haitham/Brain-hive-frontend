import React from "react";
import "../LearningStylesBar.css";

const LearningStylesBar = ({ onSelectStyle }) => {
  return (
    <div className='LearningStylesBar'>
      <button className='nav-item' onClick={() => onSelectStyle("Auditory")}>
        Auditory
      </button>
      <button className='nav-item' onClick={() => onSelectStyle("Visual")}>
        Visual
      </button>
      <button className='nav-item' onClick={() => onSelectStyle("Read/Write")}>
        Read/Write
      </button>
      <button className='nav-item' onClick={() => onSelectStyle("Kinesthetic")}>
        Kinesthetic
      </button>
    </div>
  );
};

export default LearningStylesBar;
