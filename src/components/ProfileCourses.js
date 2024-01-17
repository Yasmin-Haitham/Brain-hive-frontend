import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CoursesProfile.css";
import { Button } from "react-bootstrap";

import * as api from "./API";

function ProfileCourses({ userData }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const userDataCourses = userData?.enrolledCourses || []; // Use optional chaining
  

  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProfileCourses(userDataCourses, setCourses, setError);
  }, [userDataCourses]);
  const handleClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className='courses-container'>
      <div className='coursestitle'>Courses</div>
      <button
        className='all-courses-button'
        onClick={() => navigate("/Courses")}>
        All Courses
      </button>

      {userDataCourses.length === 0 ? (
        <div className='no-courses-message'>
          You didn't enroll in any courses yet. Click the button below to check
          out all our courses.
          <Button className='browse' onClick={() => navigate("/Courses")}>
            Browse Courses
          </Button>
        </div>
      ) : (
        <div className='courses-grid'>
          {courses.map((course, index) => (
            <button
              key={course.id}
              className='course-image-btn'
              onClick={() => handleClick(course.id)}>
              <img
                src={course.courseImage.fields.file.url}
                alt={`course ${index + 1}`}
              />
              <div className='course-name'>{course.courseName}</div>
            </button>
          ))}
        </div>
      )}
      {/* Display error message if there is one */}
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}

export default ProfileCourses;
