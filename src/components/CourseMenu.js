import React, { useState, useEffect } from "react";
import "../CourseMenu.css";

// The CourseMenu component takes courseId as a prop to fetch the relevant course data
const CourseMenu = ({ content, onClickHandler }) => {
  // State to keep track of whether the course menu is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = (lecture) => {
    // Call the passed function with parameters
    onClickHandler(lecture);
  };
  // Function to handle clicks on menu lectures, setting the active lecture lecture
  const CourseMenu = ({ content = [], onSelectContentlecture }) => {
    console.log("content in CourseMenu:", content);
    // ... existing logic
  };
  // Function to toggle the collapsed state of the menu
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

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
              <button className='menuitem' onClick={() => handleClick(lecture)}>
               
                {lecture.label}
              </button>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseMenu;
