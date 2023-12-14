import React from 'react';
import '../CourseHeader.css'; // Assuming you have a CSS file for styling

const CourseHeader = ({ courseName, instructorName }) => {
  return (
    <div className="course-header">
      <h2 className="course-name">Course Name{courseName}</h2>
      <h3 className="instructor-name">Teached By:{instructorName}</h3>
    </div>
  );
};

export default CourseHeader;
