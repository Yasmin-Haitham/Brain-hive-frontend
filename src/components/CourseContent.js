import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer.js";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css"; // Go up one directory level
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js"; // Make sure to import the correct component

const CourseContent = () => {
  const videoUrl =
    "https://www.youtube.com/watch?v=yqtdtCCWBzY&list=PLGZ7eihNHo7yy0au7Mpz8GP2sc79wVfmX&index=4"; // Replace with your video URL

  // Define a state variable to track the selected learning style
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <div>
      <NavbarComponent />

      <LearningStylesBar onSelectStyle={setSelectedStyle} />

      <CourseHeader />

      {selectedStyle === "Visual" && (
        <div className={styles.videoPlayerContainer}>
          <VideoPlayer url={videoUrl} className={styles.reactPlayer} />
        </div>
      )}
    </div>
  );
};

export default CourseContent;
