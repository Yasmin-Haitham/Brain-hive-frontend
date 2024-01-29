import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CoursesProfile.css";
import logo from "../images/logo.png";
import * as api from "./API.js";

function Badges() {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  //use state badges set
  const [badgeSet, setBadgeSet] = useState(false);

  // Fetch badges for the user
  const fetchBadges = async () => {
    try {
      const response = await api.getUserBadges();
      // Assuming the API returns an array of badges
      setBadges(response || []); // Use an empty array if response.data is falsy
      setBadgeSet(true);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, [badgeSet]);

  return (
    <div className="courses-container">
      <div className="coursestitle">Badges</div>
      <button
        className="all-courses-button"
        onClick={() => navigate("/Courses")}
      >
        All Courses
      </button>

      <div className="courses-grid">
        {badges &&
          badges.map((badge) => (
            <button className="course-image-btn" key={badge.id}>
              <img src={badge.image.fields.file.url} alt={badge.name} />
              <div className="course-name">{badge.name}</div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default Badges;
