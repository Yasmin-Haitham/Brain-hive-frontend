import React from "react";
import "../LearningStylesBar.css";

const LearningStylesBar = () => {
  return (
    <div className="LearningStylesBar">
      <ul className="navbar-list">
        <li className="nav-item">Auditory</li>
        <li className="nav-item">Visual</li>
        <li className="nav-item">Read/Write</li>
        <li className="nav-item">Kinesthetic</li>
        <li className="nav-item">Default</li>
      </ul>
    </div>
  );
};

export default LearningStylesBar;
