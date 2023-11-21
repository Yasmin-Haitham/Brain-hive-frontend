import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../index.css";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";

function SignUpForm({ onSignUpClick }) {
  // backend link **************************************

  const onSubmit = (values) => {
    // Create an object to hold the form data
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
    };

    // Send the form data to the server using Axios
    axios
      .post("http://localhost:3030/user/create", formData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle a successful response here
        console.log("User created:", response.data);
        // Redirect or show a success message as needed
        window.location.href = "/quiz";
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error creating user:", error);
        // You can also display an error message to the user
      });
  };
  //****************************************************
  const { Formik } = formik;
  const phoneRegExp = /^01[0125][0-9]{8}$/;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  });

  return (
    <div className="slideUp-animation">
      <Row>
        <h1 className="form-header">Get Started</h1>
      </Row>
      <Row>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              style={{ justifyItems: "left", padding: "0px" }}
            >
              <Row
                className="align-items-left"
                style={{ margin: "0", padding: "0px", width: "100%" }}
              >
                <Form.Group
                  as={Col}
                  style={{ width: "40%" }}
                  md="auto"
                  controlId="validationFormik101"
                  className="form-group"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="auto"
                  style={{ width: "40%" }}
                  controlId="validationFormik102"
                  className="form-group"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row
                className="mb-2"
                style={{ margin: "0", padding: "0px", width: "100%" }}
              >
                <Form.Group
                  as={Col}
                  md="auto"
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
                  style={{ width: "40%" }}
                  md="auto"
                  controlId="validationFormik102"
                  className="form-group"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row
                className="mb-2"
                style={{ margin: "0", padding: "0px", width: "100%" }}
              >
                <Form.Group
                  as={Col}
                  style={{ width: "40%" }}
                  md="auto"
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
                <Form.Group
                  as={Col}
                  style={{ width: "40%" }}
                  md="auto"
                  controlId="validationFormik102"
                  className="form-group"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row style={{ margin: "0", padding: "0px" }} className="mb-2">
                <Form.Group className="form-group mb-2">
                  <Form.Check
                    style={{ paddingTop: "10px" }}
                    required
                    className="form-label"
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    isInvalid={touched.terms && !!errors.terms}
                    feedback={errors.terms}
                    // feedbackType="invalid"
                    id="validationFormik106"
                    feedbackTooltip
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="auto"
                  controlId="validationFormik102"
                  className="form-group mb-2"
                ></Form.Group>
              </Row>

              <Button className="signupbtn" type="submit">
                Create Account
              </Button>
              {/*  */}
              <Form.Text
                style={{ marginLeft: "35px" }}
                className="btm-text-highlighted"
              >
                Already have an account..? <a href="/"> Login</a>
              </Form.Text>
            </Form>
          )}
        </Formik>
      </Row>
    </div>
  );
}

export default SignUpForm;
