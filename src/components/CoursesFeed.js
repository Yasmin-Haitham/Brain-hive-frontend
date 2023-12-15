import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CoursesFeed.css";
import api from "./API";

function CoursesFeed(props) {
  const { courseName, description, comment, image, courseId } = props;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios function to enroll in the course
  const enrollCourse = async () => {
    try {
      api.getUser(setUserData, setLoading)
      const response = await axios.post(
        `http://localhost:3030/courses/enroll`,
        { courseName: courseName, courseId: courseId },
        { withCredentials: true }
      );
      console.log(response.data); // Log the response if needed

      // Handle additional logic after enrolling in the course
    } catch (error) {
      console.error("Error enrolling in the course:", error);
    }
  };

  return (
    <div className="CoursesFeed">
      <div className="CoursesFeed-header">
        <div className="CoursesFeed-user-info">
          <h3 className="CoursesFeed-user-name">{courseName}</h3>
        </div>
      </div>
      <div className="CoursesFeed-content">
        <p className="CoursesFeed-post-description">{description}</p>
        <img className="CoursesFeed-post-image" src={image} alt="Post Image" />
        <div className="CoursesFeed-buttons">
          <button className="CoursesFeed-comment-button">{comment}</button>
          <div style={{ marginTop: "5px", fontSize: "30px" }}>{"|"}</div>
          <button
            className="CoursesFeed-start-course-button"
            onClick={enrollCourse}
          >
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
export default CoursesFeed;
