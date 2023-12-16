import React from "react";
import VideoPlayer from "./VideoPlayer.js";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css"; // Go up one directory level
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js";

const CourseContent = () => {
  const videoUrl =
    "https://www.youtube.com/watch?v=yqtdtCCWBzY&list=PLGZ7eihNHo7yy0au7Mpz8GP2sc79wVfmX&index=4"; // Replace with your video URL

  return (
    <div>
      <NavbarComponent />
      <LearningStylesBar />
      <CourseHeader />
      <div className={styles.videoPlayerContainer}>
        <VideoPlayer url={videoUrl} className={styles.reactPlayer} />
      </div>
    </div>
  );
};

export default CourseContent;
