import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer.js";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css";
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js";
import CoursePDFViewer from "./CoursePDFViewer.js";
import AuditoryCoursePlayer from "./AuditoryCoursePlayer.js";

const CourseContent = () => {
  const videoUrl =
    "https://www.youtube.com/watch?v=yqtdtCCWBzY&list=PLGZ7eihNHo7yy0au7Mpz8GP2sc79wVfmX&index=4";
  const pdfFile =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const audiofile =
    "C:/Users/user/Desktop/grad project/Louis Armstrong - What A Wonderful World (Official Video).mp3";

  // Define a state variable to track the selected learning style
  const [selectedStyle, setSelectedStyle] = useState(null);
  const handleStyleSelection = (style) => {
    setSelectedStyle(style);
  };

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
      {selectedStyle === "Read/Write" && (
        <div>
          <CoursePDFViewer file={pdfFile} />
        </div>
      )}
      {selectedStyle === "Auditory" && (
        <div>
          <AuditoryCoursePlayer audioSrc={audiofile} />
          <AuditoryCoursePlayer audioSrc={audiofile} />
          
        </div>
      )}
    </div>
  );
};

export default CourseContent;
