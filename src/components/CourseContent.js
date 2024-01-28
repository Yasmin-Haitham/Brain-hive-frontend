import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css";
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js";
import VideoPlayer from "./VideoPlayer.js"; //Auditory
import CoursePDFViewer from "./CoursePDFViewer.js"; // Read/Write
import GalleryGrid from "./GalleryGrid.js"; // Visual
import PomodoroTimer from "./Timer";
import CourseMenu from "./CourseMenu.js";
import "../CourseContent.css";

import TodoFinal from "./TodoFinal.js";
import * as api from "./API.js";

const CourseContent = () => {
  ///////////////////////////////////////////////////BACKEND/////////////////////////////////////////////////////
  const [selectedContentItem, setSelectedContentItem] = useState(null); // Add this state
  const { courseId } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [API_KEY, setAPI_KEY] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [userSet, setUserSet] = useState(false);
  const [courseSet, setCourseSet] = useState(false);

  const handleMenuItemClick = (selecteditem) => {
    setSelectedContentItem(selecteditem);
  };
  const createVideoObject = async (videoData) => {
    try {
      // Use Promise.all to wait for all asynchronous operations to complete
      const titles = await Promise.all(videoData.map(api.extractYouTubeTitle));

      // Now, titles contains an array of video titles corresponding to videoData
      const videoObject = videoData.map((item, index) => ({
        title: titles[index],
        link: item,
      }));
      console.log(videoObject);
      return videoObject;
    } catch (error) {
      // Handle errors here, if needed
      console.error("Error creating video object:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };

  const createPdfObject = (pdfData) => {
    // Create PDF object with title and pdf link
    const pdfObject = pdfData.map((item) => ({
      title: item.fields.title,
      link: item.fields.file.url,
    }));
    return pdfObject;
  };

  const createTaskObject = (tasks) => {
    // Create task object with title, pdf, and status
    const taskObject = tasks.map((item) => ({
      title: item.fields.title,
      pdf: item.fields.file.url,
      status: false,
    }));
    return taskObject;
  };
  const createImageObject = (imageData) => {
    const imageObject = imageData.map((item) => ({
      title: item.fields.title,
      link: item.fields.file.url,
    }));
    return imageObject;
  };

  useEffect(() => {
    setLoading(true);
    try {
      if (!userSet) {
        fetchUserData();
      } else {
        setUserDataLearningStyle();
      }
    } catch (error) {
      console.log(error);
    }
    try {
      if (!courseSet) {
        fetchData();
      } else {
        processCourseData();
        if (selectedStyle === "Auditory") {
          setSelectedContentItem(videoData[0]);
        } else if (selectedStyle === "Read/Write") {
          setSelectedContentItem(pdfData[0]);
        } else if (selectedStyle === "Visual") {
          setSelectedContentItem(imageData[0]);
        } else if (selectedStyle === "Kinesthetic") {
          setSelectedContentItem(tasks[0]);
        }
      }
    } catch (e) {
      alert(`Error: No course found for ID ${e}`);
      setLoading(false);
    }
    setLoading(false);
  }, [courseSet, userSet]);

  const fetchUserData = async () => {
    await api.getUser(setUserData, setUserSet, setLoading);
  };
  const fetchData = async () => {
    // Fetch course data from the server
    await api.getOneCourse(
      courseId,
      setCourseSet,
      setCurrentCourse,
      setAPI_KEY
    );
  };
  const setUserDataLearningStyle = () => {
    if (!userData) {
      // Handle the case where userData is null
      console.log("Error: User data not available");
      return;
    }

    const userDefaultStyle = userData.LearningStyle;
    console.log(userDefaultStyle);
    if (userDefaultStyle === "Auditory") {
      setSelectedStyle("Auditory");
    } else if (userDefaultStyle === "ReadWrite") {
      setSelectedStyle("Read/Write");
    } else if (userDefaultStyle === "Visual") {
      setSelectedStyle("Visual");
    } else if (userDefaultStyle === "Kinesthetic") {
      setSelectedStyle("Kinesthetic");
    } else {
      alert("Error: User does not have a learning style");
      setSelectedStyle("");
    }
  };
  // Proceed with processing course data
  const processCourseData = async () => {
    if (!currentCourse) {
      console.warn("No course data available.");
      return;
    }

    // Create video object with title and link
    setVideoData(
      await createVideoObject(currentCourse.courseLectureRecordings)
    );

    // Create PDF object with title and pdf
    setPdfData(createPdfObject(currentCourse.courseLectures));

    // Create task object with title, pdf, and status (boolean)
    setTasks(createTaskObject(currentCourse.courseSections));

    //create image object with title and image source
    setImageData(createImageObject(currentCourse.courseVisuals));

    // Set loading to false once all data is processed
    setLoading(false);
  };

  ///////////////////////////////////////////////////BACKEND STOP/////////////////////////////////////////////////////
  const videoUrl =
    "https://www.youtube.com/watch?v=yqtdtCCWBzY&list=PLGZ7eihNHo7yy0au7Mpz8GP2sc79wVfmX&index=4";
  const pdfFile =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  // const audiofile =
  //   "C:/Users/user/Desktop/grad project/Louis Armstrong - What A Wonderful World (Official Video).mp3";

  const courseContent = (() => {
    switch (selectedStyle) {
      case "Auditory":
        return videoData.map((video, index) => ({
          label: `${video.title}`,
          link: `${video.link}`,
        }));
      case "Read/Write":
        return pdfData.map((pdf, index) => ({
          label: `${pdf.title}`,
          link: `${pdf.link}`,
        }));
      case "Visual":
        return imageData.map((img, index) => ({
          label: `${img.title}`,
          link: `${img.link}`,
        }));
      case "Kinesthetic":
        return tasks.map((task, index) => ({
          label: `Task ${index + 1}`,
          link: `${task.link}`,
        }));
      default:
        return [];
    }
  })();

  // Define a state variable to track the selected learning style

  const handleStyleSelection = (style) => {
    setSelectedStyle(style);
    if (style === "Auditory") {
      setSelectedContentItem(videoData[0]);
    } else if (style === "Read/Write") {
      setSelectedContentItem(pdfData[0]);
    } else if (style === "Visual") {
      setSelectedContentItem(imageData[0]);
    } else if (style === "Kinesthetic") {
      setSelectedContentItem(tasks[0]);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className='course-content-container'>
        <div className='course-layout'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {console.log(courseContent)}
              {/* Pass handleMenuItem<CourseMenu content={courseContent} onSelectContentItem={handleMenuItemClick} />Click to CourseMenu */}
              {courseContent ? (
                <CourseMenu
                  content={courseContent}
                  onClickHandler={handleMenuItemClick}
                />
              ) : (
                <div></div>
              )}

              <div className='course-viewer'>
                {/* Render components based on selectedStyle and selectedContentItem */}
                {selectedStyle === "Auditory" && selectedContentItem && (
                  <VideoPlayer url={selectedContentItem.link} />
                )}
                {selectedStyle === "Read/Write" && selectedContentItem && (
                  <CoursePDFViewer file={selectedContentItem.link} />
                )}
                {selectedStyle === "Visual" && selectedContentItem && (
                  <GalleryGrid images={selectedContentItem.link} />
                )}
                {selectedStyle === "Kinesthetic" && selectedContentItem && (
                  <TodoFinal tasks={selectedContentItem} />
                )}
              </div>

              <LearningStylesBar onSelectStyle={handleStyleSelection} />
            </>
          )}
        </div>
        <div>
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
