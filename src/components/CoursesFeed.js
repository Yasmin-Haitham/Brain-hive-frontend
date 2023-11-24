import React from "react";
import "../CoursesFeed.css";
import viking from "../images/viking.jpg";
import post from "../images/post.jpg";

function CoursesFeed(props) {
  const { username, date, description, comment } = props;
  return (
    <div className="CoursesFeed">
      <div className="CoursesFeed-header">
        <img
          className="CoursesFeed-profile-pic"
          src={viking}
          alt="Profile Pic"
        />

        <div className="CoursesFeed-user-info">
          <h3 className="CoursesFeed-user-name">{username}</h3>
          <p className="CoursesFeed-post-date">{date}</p>
        </div>
      </div>
      <div className="CoursesFeed-content">
        <p className="CoursesFeed-post-description">{description}</p>
        <img className="CoursesFeed-post-image" src={post} alt="Post Image" />
        <div className="CoursesFeed-buttons">
          <button className="CoursesFeed-comment-button">{comment}</button>
          <div style={{ marginTop: "5px", fontSize: "30px" }}>{"|"}</div>
          <button className="CoursesFeed-start-course-button">
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
export default CoursesFeed;
