import React from "react";
import "../Feed.css";
import viking from "../images/viking.jpg";
import post from "../images/post.jpg";

function Feed() {
  return (
    <div className='Feed'>
      <div className='Feed-header'>
        <img className='Feed-profile-pic' src={viking} alt='Profile Pic' />

        <div className='Feed-user-info'>
          <h3 className='Feed-user-name'>User Name</h3>
          <p className='Feed-post-date'>October 10, 2023</p>
        </div>
      </div>
      <div className='Feed-content'>
        <p className='Feed-post-description'>
          here will be the description of the offered course posted in the feed
          including the type of learning used in this course
        </p>
        <img className='Feed-post-image' src={post} alt='Post Image' />
        <div className='Feed-buttons'>
          <button className='Feed-comment-button'>Comment</button>
          <div style={{ marginTop: "5px", fontSize: "30px" }}>{"|"}</div>
          <button className='Feed-start-course-button'>Start Course</button>
        </div>
      </div>
      
    </div>
  );
}
export default Feed;
