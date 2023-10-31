import React from "react";
import { useNavigate } from "react-router-dom";
import "../CoursesProfile.css";
import logo from "../images/logo.png";

function Badges() {
  const navigate = useNavigate();

  const handleClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className='courses-container'>
      <div className='coursestitle'>Badges</div>
      <button
        className='all-courses-button'
        onClick={() => navigate("/Courses")}>
        All Courses
      </button>

      <div className='courses-grid'>
        <button className='course-image-btn'>
          <img src={logo} alt='course' />
        </button>
        <button className='course-image-btn'>
          <img src={logo} alt='course' />
        </button>
        <button className='course-image-btn'>
          <img src={logo} alt='course' />
        </button>
        
      </div>
    </div>
  );
}
export default Badges;
