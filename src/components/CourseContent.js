import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import styles from "../VideoPlayer.module.css";
import CourseHeader from "./CourseHeader.js";
import LearningStylesBar from "./learningstylesbar.js";
import VideoPlayer from "./VideoPlayer.js"; //Auditory
import CoursePDFViewer from "./CoursePDFViewer.js"; // Read/Write
import GalleryGrid from "./GalleryGrid.js"; // Visual
import Todolist from "./Todolist.js"; // kinesthetic
import CourseMenu from "./CourseMenu.js";
import "../CourseContent.css";

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
  const [currentCourse, setCurrentCourse] = useState();
  const [API_KEY, setAPI_KEY] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [userSet, setUserSet] = useState(false);

  const createVideoObject = async () => {
    const titlesPromises = videoData.map(async (item) => {
      const title = await api.extractYouTubeTitle(item, API_KEY);
      return { title, link: item };
    });

    // Wait for all promises to resolve
    const videoObjects = await Promise.all(titlesPromises);

    return videoObjects;
  };
  const handleMenuItemClick = (selecteditem) => {
    setSelectedContentItem(selecteditem);
  };

  const createPdfObject = () => {
    // Create PDF object with title and pdf link
    const pdfObject = pdfData.map((item) => ({
      // Renamed 'item' to 'item'
      title: item.fields.title,
      link: item.fields.file.url,
    }));
    return pdfObject;
  };

  const createTaskObject = () => {
    // Create task object with title, pdf, and status
    const taskObject = tasks.map((item) => ({
      title: item.fields.title,
      pdf: item.fields.file.url,
      status: false,
    }));
    return taskObject;
  };
  const createImageObject = () => {
    const imageObject = imageData.map((item) => ({
      title: item.fields.title,
      imgSrc: item.fields.file.url,
    }));
    return imageObject;
  };
 
  useEffect(async()=>{
    try {
      const result = await Promise.resolve(api.getUser(setUserData, setLoading))
      console.log("user data set \n" + userData);
      setUserDataLearningStyle();
      setUserSet(true);
    } catch (error) {
      console.log(error);
    }
  }, [userSet]);
  console.log(userSet);
  useEffect(() => {
    setLoading(true);
    try {
      fetchData();
      console.log("Data Fetched");
    } catch {
      alert(`Error: No course found for ID ${courseId}`);
      setLoading(false);
    }
    processCourseData();
    setLoading(false);
  }, [courseId]);

  const fetchData = async() => {
    // Fetch course data from the server
    const result = await api.getOneCourse(
      courseId,
      setCurrentCourse,
      setAPI_KEY
    );
    return result;
  };
  const setUserDataLearningStyle = () => {
    if (!userData) {
      // Handle the case where userData is null
      alert("Error: User data not available");
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
    // Set state variables based on the fetched course data
    console.log(currentCourse);
    setVideoData(currentCourse.courseLectureRecordings);
    setPdfData(currentCourse.courseLectures);
    setTasks(currentCourse.courseSections);
    setImageData(currentCourse.courseVisuals);

    // Create video object with title and link
    const videoObject = await createVideoObject();
    setVideoData(videoObject);

    // Create PDF object with title and pdf
    const pdfObject = createPdfObject();
    setPdfData(pdfObject);

    // Create task object with title, pdf, and status (boolean)
    const taskObject = createTaskObject();
    setTasks(taskObject);

    //create image object with title and image source
    const imgObject = createImageObject();
    setImageData(imgObject);

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
          label: `item Recording ${index + 1}`,
          link: `#${video.link}`,
        }));
      case "Read/Write":
        return pdfData.map((pdf, index) => ({
          label: `item ${index + 1}`,
          link: `#${pdf.link}`,
        }));
      case "Visual":
        return imageData.map((img, index) => ({
          label: `${img.title}`,
          link: `#${img.link}`,
        }));
      case "Kinesthetic":
        return tasks.map((task, index) => ({
          label: `Task ${index + 1}`,
          link: `#${task.link}`,
        }));
      default:
        return [];
    }
  })();

  // Define a state variable to track the selected learning style

  const handleStyleSelection = (style) => {
    setSelectedStyle(style);
    // Reset the selected content item when the style changes
    setSelectedContentItem(null);
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
              {/* Pass handleMenuItemClick to CourseMenu */}

              <CourseMenu
                content={courseContent}
                onSelectContentItem={handleMenuItemClick}
              />

              <div className='course-viewer'>
                {/* Render components based on selectedStyle and selectedContentItem */}
                {selectedStyle === "Auditory" && selectedContentItem && (
                  <VideoPlayer url={selectedContentItem.link} />
                )}
                {selectedStyle === "Read/Write" && selectedContentItem && (
                  <CoursePDFViewer file={selectedContentItem.link} />
                )}
                {selectedStyle === "Visual" && selectedContentItem && (
                  <GalleryGrid images={selectedContentItem.images} />
                )}
                {selectedStyle === "Kinesthetic" && selectedContentItem && (
                  <Todolist tasks={selectedContentItem.tasks} />
                )}
              </div>

              <LearningStylesBar onSelectStyle={handleStyleSelection} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
