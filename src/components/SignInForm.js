import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../index.css";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";

function SignUpForm() {
  

  const { Formik } = formik;
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  // backend section *********************************************************************
  const onSubmit = (values) => {
    // Construct the data object to send to the server
    const userData = {
      email: values.email,
      password: values.password,
    };

    // Make a POST request to your server for login
    axios
      .post("http://localhost:3030/user/login",userData, {withCredentials: true})
      .then((response) => {
        // Handle the response from the server (e.g., redirect or display a message)
        console.log("Login successful", response.data);

        localStorage.setItem("userId", response.data._id);

        // Check if the login was successful
        if (response.data.success) {
          // Redirect to the home page or perform any other action
          window.location.href = "/home";
        } else {
          // Display an alert if the login was not successful
          alert("Email or password is wrong.");
        }
      })
      .catch((error) => {
        // Handle errors (e.g., display an error message)
        console.log("Login failed", error);
        // Display an alert for other errors
        alert("An error occurred while logging in.");
      });
  };
  // backend section *********************************************************************
  return (
    <div className="slideUp-animation">
      <Row style={{ marginTop: "7rem" }}>
        <h1 className="form-header">Log in</h1>
      </Row>
      <Row>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              style={{ justifyItems: "left", padding: "0px" }}
            >
              <Row className="mb-4" style={{ margin: "0px", width: "100%" }}>
                <Form.Group
                  as={Col}
                  md="4"
                  style={{ width: "40%" }}
                  controlId="validationFormik102"
                  className="form-group"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="4"
                  style={{ width: "40%" }}
                  controlId="validationFormik102"
                  className="form-group"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button style={{ marginLeft: "35px" }} type="submit">
                Login{" "}
              </Button>
              {/*  */}
              <Form.Text
                style={{ marginLeft: "35px" }}
                className="btm-text-highlighted"
              >
                Don't have an account..? <a href="SignUp"> Register</a>
              </Form.Text>
            </Form>
          )}
        </Formik>
      </Row>
    </div>
  );
}

export default SignUpForm;
