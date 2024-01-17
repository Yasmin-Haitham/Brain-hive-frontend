import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer.js";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css";
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js";
import CoursePDFViewer from "./CoursePDFViewer.js";
import AuditoryCoursePlayer from "./AuditoryCoursePlayer.js";
import CourseMenu from "./CourseMenu.js";
import "../CourseContent.css";
import Todolist from "./Todolist.js";
const CourseContent = () => {
  const videoUrl =
    "https://www.youtube.com/watch?v=yqtdtCCWBzY&list=PLGZ7eihNHo7yy0au7Mpz8GP2sc79wVfmX&index=4";
  const pdfFile =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const audiofile =
    "C:/Users/user/Desktop/grad project/Louis Armstrong - What A Wonderful World (Official Video).mp3";

  const courseContent = [
    { label: "Lecture 1", link: "#lecture1" },
    { label: "Lecture 2", link: "#lecture2" },
    // ... more content
  ];

  // Define a state variable to track the selected learning style
  const [selectedStyle, setSelectedStyle] = useState(null);
  const handleStyleSelection = (style) => {
    setSelectedStyle(style);
  };

  return (
    <div>
      <NavbarComponent />
      <div className='course-content-container'>
        <div className='course-layout'>
          <CourseMenu content={courseContent} />

          <div className='course-viewer'>
            {selectedStyle === "Visual" && <VideoPlayer url={videoUrl} />}
            {selectedStyle === "Read/Write" && (
              <CoursePDFViewer file={pdfFile} />
            )}
            {selectedStyle === "Auditory" && (
              <AuditoryCoursePlayer audioSrc={audiofile} />
            )}
            {selectedStyle === "Kinesthetic" && <Todolist />}
          </div>

          <LearningStylesBar onSelectStyle={handleStyleSelection} />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
