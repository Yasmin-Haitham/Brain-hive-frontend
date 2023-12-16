import React from "react";
import "../LearningStylesBar.css";

const LearningStylesBar = ({ onSelectStyle }) => {
  return (
    <div className="LearningStylesBar">
      <ul className="navbar-list">
        <li className="nav-item" onClick={() => onSelectStyle("Auditory")}>
          Auditory
        </li>
        <li className="nav-item" onClick={() => onSelectStyle("Visual")}>
          Visual
        </li>
        <li className="nav-item" onClick={() => onSelectStyle("Read/Write")}>
          Read/Write
        </li>
        <li className="nav-item" onClick={() => onSelectStyle("Kinesthetic")}>
          Kinesthetic
        </li>
        <li className="nav-item" onClick={() => onSelectStyle("Default")}>
          Default
        </li>
      </ul>
    </div>
  );
};

export default LearningStylesBar;
