import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LeftSideSignUp from "./LeftSideSignUp";
import SignUpForm from "./SignUpForm";
import Quiz from "./Quiz";
import "../index.css";

function SignUp() {
  const [displayComponent, setDisplayComponent] = useState("sign-up");

  const handleSignUpClick = () => {
    // Switch to the "quiz" component when the Sign Up button is clicked
    setDisplayComponent("quiz");
  };

  return (
    <Row style={{ margin: "0px", height: "100vh" }}>
      <Col className='col-6 col-md-5' style={{ backgroundColor: "#b8860b" }}>
        <LeftSideSignUp />
      </Col>
      <Col className='col-6 col-md-7' style={{ backgroundColor: "#1d2b3a" }}>
        {displayComponent === "sign-up" ? (
          <SignUpForm onSignUpClick={handleSignUpClick} />
        ) : (
          <Quiz />
        )}
      </Col>
    </Row>
  );
}

export default SignUp;
