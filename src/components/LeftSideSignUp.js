import React from "react";
import "../index.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../images/signUp.svg"; // Tell webpack this JS file uses this image
import arrow from "../images/dbl-arrow.png"; // Tell webpack this JS file uses this image

function LeftSideImage() {
  return (
    <Container className='slideUp-animation'>
      <Col>
        <Row className='left-side'>
          <h1 style={{ fontWeight: "bold" }}>Brain Hive</h1>
        </Row>
        <Row style={{ margin: "0px", justifyContent: "center" }}>
          <img
            className='slideUp-animation'
            style={{ width: "85%" }}
            src={logo}
            alt='Website Logo'
          />
        </Row>
        <Row className='left-side'>
          <div className='left-side quote' style={{ justifyContent: "center" }}>
            <h3>Sign up today and start your new learning experience</h3>
          </div>
          <img
            className='mobile-btm-nav slideUp-animation'
            style={{ width: "20%" }}
            src={arrow}
            alt='Website Logo'
          />
        </Row>
      </Col>
    </Container>
  );
}

export default LeftSideImage;
