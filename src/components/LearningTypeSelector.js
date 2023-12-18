import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import CoursePDFViewer from "./CoursePDFViewer";
import "../selector.css";

const LearningTypeSelector = ({ videoUrl, pdfFile }) => {
  const [learningType, setLearningType] = useState("visual");

  const handleLearningTypeChange = (event) => {
    setLearningType(event.target.value);
  };

  return (
    <div className='select' style={{ color: "black" }}>
      <select onChange={handleLearningTypeChange}>
        <option value='visual'>Visual</option>
        <option value='read/write'>Read/Write</option>
      </select>
      {learningType === "visual" ? (
        <VideoPlayer url={videoUrl} />
      ) : (
        <CoursePDFViewer file={pdfFile} />
      )}
    </div>
  );
};

export default LearningTypeSelector;
