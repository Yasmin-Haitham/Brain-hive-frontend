import React, { useEffect, useState } from "react";
import CoursesFeed from "./CoursesFeed";
import * as api from "./API";
import Feed from "./Feed";

function MultFeed() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch courses from Contentful
    api.getrecommendedCourses(setCards);
  }, []);

  return (
    <div className='home-feed-container'>
      <div className='cards-container'>
        {" "}
        <div
          className='recommended'
          style={{
            marginBottom: "20px",
            marginLeft: "250px",
            fontSize: "2rem",
            color: "#1d2b3a",
            fontWeight: "bolder",
          }}>
          Recommended Courses
        </div>
        <div className='cards-container'>
          {cards.map((card, index) => (
            <Feed
              key={index}
              courseId={card.id}
              description={card.description.content[0].content[0].value}
              comment='comment'
              courseName={card.courseName}
              image={card.courseImage.fields.file.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultFeed;
