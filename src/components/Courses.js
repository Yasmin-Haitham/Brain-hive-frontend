import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import CoursesFeed from "./CoursesFeed";
import * as api from "./API";

import { Container, Col, Row } from "reactstrap";

function Courses() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    // Fetch courses from Contentful
    api.getCourses(setCards)
  }, []);
  return (
    <div>
      <NavbarComponent />
      <Container fluid className="my-3">
        <Row>
          {cards.map((card, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <CoursesFeed
                courseId={card.id}
                description={card.description.content[0].content[0].value}
                comment="comment"
                courseName={card.courseName}
                image={card.courseImage.fields.file.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
export default Courses;
