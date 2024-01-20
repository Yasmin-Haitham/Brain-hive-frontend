import React, { useState, useEffect } from "react";
import "../CourseMenu.css";

// The CourseMenu component takes courseId as a prop to fetch the relevant course data
const CourseMenu = ({ content, onSelectContentlecture }) => {
  // State to keep track of whether the course menu is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  // // State to keep track of the currently active (selected) lecture lecture
  // const [activelecture, setActivelecture] = useState(null);

  // // State to store the course's lectures fetched from the database
  // const [content, setContent] = useState([]);

  // // useEffect hook to fetch course data from the database when the component mounts or courseId changes
  // useEffect(() => {
  //   // Define an asynchronous function to fetch the course content
  //   const fetchContent = async () => {
  //     try {
  //       // Perform a GET request to the server to retrieve course lectures
  //       const response = await fetch(`/api/courses/${courseId}/lectures`);
  //       // Parse the JSON response
  //       const data = await response.json();
  //       // Update the content state with the fetched lectures
  //       setContent(data.courselectures);
  //     } catch (error) {
  //       // Log any errors that occur during the fetch operation
  //       console.error("Failed to fetch course lectures", error);
  //     }
  //   };

  //   // Call the fetchContent function
  //   fetchContent();
  // }, [courseId]); // The effect depends on courseId and will re-run if it changes

  // Function to handle clicks on menu lectures, setting the active lecture lecture
  const handleMenulectureClick = (lecture) => {
    onSelectContentlecture(lecture);
  };
  const CourseMenu = ({ content = [], onSelectContentlecture }) => {
    console.log("content in CourseMenu:", content);
    // ... existing logic
  };
  // Function to toggle the collapsed state of the menu
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  // // Function to render the content based on the active lecture's content type
  // const renderContent = () => {
  //   // If there is no active lecture, return null to render nothing
  //   if (!activelecture) return null;

  //   // Determine the content type from the active lecture's file metadata
  //   const contentType = activelecture.fields.file.contentType;
  //   // Construct the complete URL for the content
  //   const contentUrl = `https:${activelecture.fields.file.url}`;

  //   // Switch statement to handle different content types
  //   switch (contentType) {
  //     case "application/pdf":
  //       // Render a PDF within an iframe for PDF content types
  //       return <iframe src={contentUrl} title={activelecture.fields.title} />;
  //     case "video":
  //       // Render a video element for video content types
  //       return <video src={contentUrl} controls />;
  //     case "image/png":
  //     case "image/jpeg":
  //       // Render an img element for image content types (both PNG and JPEG)
  //       return <img src={contentUrl} alt={activelecture.fields.title} />;
  //     // Add cases for other content types as needed
  //     default:
  //       // Render a message for unsupported content types
  //       return <div>Unsupported content type</div>;
  //   }
  // };

  // The component returns a div that contains the course menu and the content area
  return (
    <div className={`course-menu ${isCollapsed ? "collapsed" : ""}`}>
      {/* Button to toggle the menu's collapsed state */}
      <button className='menu-toggle' onClick={toggleMenu}>
        {/* Text of the button changes based on whether the menu is collapsed or expanded */}
        {isCollapsed ? "►" : "◄"}
      </button>

      {/* Menu content area, visibility is controlled by the isCollapsed state */}
      <div className={`menu-content ${isCollapsed ? "hidden" : ""}`}>
        {/* List of course lectures rendered as buttons */}
        <ul>
          {content.map((lecture, index) => (
            // lecture is the lecture which represent the current element being processed in the content
            // index is the  array index of the current lecture within the content array.
            //  It's provided by the .map() function as the second argument.
            // It's a numerical index starting from 0 for the first element in the array.
            // Map each lecture to a list lecture with a button
            <li key={index}>
              <button onClick={() => handleMenulectureClick(lecture)}>
                {/* The button's text is the title of the lecture */}
                {lecture.fields.title}
                {/* {lecture.label} */}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content area where the active lecture's content is displayed */}
      {/* <div className='content-area'>{renderContent()}</div> */}
    </div>
  );
};

export default CourseMenu;
