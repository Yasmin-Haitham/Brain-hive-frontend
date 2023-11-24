import React from "react";
import NavbarComponent from "./NavbarComponent";
import CoursesFeed from "./CoursesFeed";

import { Container, Col, Row } from "reactstrap";
const cards = [
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
  {
    username: "username123",
    date: "01/01/2023",
    description: "description",
    comment: "comment",
  },
];

function Courses() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid className="my-3">
        <Row>
          {cards.map((card) => {
            return (
              <>
                <Col sm={4}>
                  <CoursesFeed
                    description={card.description}
                    comment={card.comment}
                    date={card.date}
                    username={card.username}
                  ></CoursesFeed>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
export default Courses;
