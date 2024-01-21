import React, { useState, useEffect } from 'react';
import * as Api from './API';
import '../Feed.css';
import viking from '../images/viking.jpg';
import post from '../images/post.jpg';

function Feed() {
  const [userData, setUserData] = useState(null);
  const [userSet, setUserSet] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the component mounts
  useEffect(() => {
    Api.getUser(setUserData, setUserSet, setLoading);
  }, []);

  return (
    <div className="Feed">
      <div className="Feed-header">
        {loading ? (
          <p>Loading user data...</p>
        ) : userData ? (
          <>
            {userData.ProfilePicturePath ? (
              <img src={process.env.PUBLIC_URL + `/${userData.ProfilePicturePath}.png`} className="Feed-profile-pic" alt="Profile" />
            ) : (
              <p>No profile picture available</p>
            )}
            <div className="Feed-user-info">
              {userData.Name ? <h3 className="Feed-user-name">{userData.Name}</h3> : <p>No user name available</p>}
              <p className="Feed-post-date">October 10, 2023</p>
            </div>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>
      <div className="Feed-content">
        <p className="Feed-post-description">Here will be the description of the offered course posted in the feed, including the type of learning used in this course.</p>
        <img className="Feed-post-image" src={post} alt="Post Image" />
        <div className="Feed-buttons">
          <button className="Feed-comment-button">Comment</button>
          <div style={{ marginTop: '5px', fontSize: '30px' }}>{'|'}</div>
          <button className="Feed-start-course-button">Start Course</button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
