import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import Courses from "./ProfileCourses";
import Milestones from "./Milestones";
import Badges from "./Badges";
import Friends from "./Friends";
import "../profile.css";
import { Button } from "react-bootstrap";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Define components for each tab
  const tabComponents = {
    courses: <Courses />,
    milestones: <Milestones />,
    badges: <Badges />,
    friends: <Friends />,
  };

  // Fetch user data from the server
  const getUser = () => {
    axios
      .get("http://localhost:3030/user/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <NavbarComponent />
      <div className="profile-container">
        <div className="cover-image"></div>
        <div className="profile-picture-container">
          {loading ? (
            <p>Loading user data...</p>
          ) : (
            userData && (
              <img
                src={process.env.PUBLIC_URL + `/${userData.ProfilePicturePath}.png`}
                className="profile-picture"
                alt="Profile"
              />
            )
          )}
        </div>
        <div className="name">
          {userData ? (
            <>
              <h2 className="user-name">{userData.Name}</h2>
              <h3 className="RPGrole">{userData.LearningStyle}</h3>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
        <hr className="separator" />
        <div className="buttons-container">
          <Button onClick={() => handleTabClick("courses")}>Courses</Button>
          <Button onClick={() => handleTabClick("milestones")}>
            Milestones
          </Button>
          <Button onClick={() => handleTabClick("badges")}>Badges</Button>
          <Button onClick={() => handleTabClick("friends")}>Friends</Button>
        </div>
        <hr className="separator" />
        <div className="component-container">{tabComponents[activeTab]}</div>
      </div>
    </div>
  );
}

export default ProfilePage;
