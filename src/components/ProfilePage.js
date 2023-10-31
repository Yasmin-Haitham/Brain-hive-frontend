import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Courses from "./ProfileCourses";
import Milestones from "./Milestones";
import Badges from "./Badges";
import Friends from "./Friends";
import "../profile.css";
import { Button } from "react-bootstrap";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("courses");

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
  return (
    <div>
      <NavbarComponent />
      <div className='profile-container'>
        <div className='cover-image'></div>
        <div className='profile-picture-container'>
          <div className='profile-picture'></div>
        </div>
        <div className='name'>
          <h2 className='user-name'>User Name</h2>
          <h3 className='RPGrole'>Mage</h3>
        </div>
        <hr className='separator' />
        <div className='buttons-container'>
          <Button onClick={() => handleTabClick("courses")}>Courses</Button>
          <Button onClick={() => handleTabClick("milestones")}>
            Milestones
          </Button>
          <Button onClick={() => handleTabClick("badges")}>Badges</Button>
          <Button onClick={() => handleTabClick("friends")}>Friends</Button>
        </div>
        <hr className='separator' />
        <div className='component-container'>{tabComponents[activeTab]}</div>
      </div>
    </div>
  );
}
export default ProfilePage;
