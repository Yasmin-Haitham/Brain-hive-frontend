import React, { useState } from 'react';
import '../CourseMenu.css';

const CourseMenu = ({ content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`course-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isCollapsed ? '►' : '◄'} {/* Unicode arrows for simplicity */}
      </button>
      <div className="menu-content">
        {isCollapsed ? null : (
          <ul>
            {content.map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseMenu;
