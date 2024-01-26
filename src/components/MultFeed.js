import React, { useEffect, useState } from "react";
import CoursesFeed from "./CoursesFeed";
import * as api from "./API";

import { Col, Row } from "reactstrap";
function MultFeed() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    // Fetch courses from Contentful
    api.getrecommendedCourses(setCards);
  }, []);
  return (
    <div>
      <Col>
        {cards.map((card, index) => (
          <Row key={index} xs={12} md={6} lg={4}>
            <CoursesFeed
              courseId={card.id}
              description={card.description.content[0].content[0].value}
              comment='comment'
              courseName={card.courseName}
              image={card.courseImage.fields.file.url}
            />
          </Row>
        ))}
      </Col>
    </div>
  );
}
export default MultFeed;
