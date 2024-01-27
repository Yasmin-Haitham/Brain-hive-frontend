import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CoursesFeed.css';
import * as api from './API';

function CoursesFeed(props) {
  const { courseName, description, comment, image, courseId } = props;
  const [userData, setUserData] = useState(null);
  const [userSet, setUserSet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUser(setUserData, setUserSet, setLoading);
  }, []);

  function isEnrolled() {
    if (userData != null) {
      console.log(userData);
      if (userData.enrolledCourses) {
        console.log(userData.enrolledCourses);
        return userData.enrolledCourses.some(function (course) {
          return course.courseName === courseName;
        });
      }
      return false;
    }
    return false;
  }

  const handleButtonClick = async () => {
    try {
      // Check if the course is already enrolled
      if (isEnrolled()) {
        // redirect to course content
        window.location.replace(`/CourseContent/${courseId}`);
        return true;
      } else {
        // Enroll in the course
        const response = await axios.post('http://localhost:3030/courses/enroll', { courseName: courseName, courseId: courseId }, { withCredentials: true });
        console.log(response.data); // Log the response if needed

        // Update the user data after enrolling
        api.getUser(setUserData, setUserSet, setLoading);
      }
    } catch (error) {
      console.error('Error handling the button click:', error);
    }
  };

  return (
    
    <div className="CoursesFeed">
      
      <div className="CoursesFeed-header">
        <div className="CoursesFeed-user-info">
          <h3 className="CoursesFeed-user-name">{courseName}</h3>
          {isEnrolled() && <div style={{ color: 'green', marginLeft: '10px' }}>Enrolled</div>}
        </div>
      </div>
      <div className="CoursesFeed-content">
        <p className="CoursesFeed-post-description">{description}</p>
        <img className="CoursesFeed-post-image" src={image} alt="Post Image" />
        <div className="CoursesFeed-buttons">
          <button className="CoursesFeed-start-course-button" onClick={handleButtonClick}>
            {isEnrolled() ? 'View Course' : 'Start Course'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursesFeed;
