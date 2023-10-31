import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LeftSideSignIn from "./LeftSideSignIn";
import Quiz from "./Quiz";
import "../index.css";

function QuizPage() {
  return (
    // <Container  style={{display: "grid",margin:"0px"}}>
    <Row style={{ margin: "0px", height: "100vh" }}>
      <Col className='col-6 col-md-5' style={{ backgroundColor: "#b8860b" }}>
        <LeftSideSignIn />
      </Col>
      <Col className='col-6 col-md-7' style={{ backgroundColor: "#1d2b3a" }}>
        <Quiz />
      </Col>
    </Row>
    //  </Container>
  );
}

export default QuizPage;
