import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../navigation.css";
import logo from "../images/logo.png";
import "../components/ProfilePage";
import "../components/Home";
import axios from "axios";

function NavbarComponent() {
  const handleLogout = () => {
    // Make an Axios request to log the user out
    axios
      .get("http://localhost:3030/user/logout")
      .then((response) => {
        if (response.status === 200) {
          // Redirect to the login page or perform any other action
          window.location.href = "/";
        } else {
          // Handle logout failure
          window.alert("Logout failed!");
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        // Handle errors (e.g., network issues)
        console.error("Error during logout", error);
      });
  };

  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary'
      bg='dark'
      data-bs-theme='dark'
      style={{ width: "100%" }}>
      <Container>
        <Navbar.Brand href='Home'>
          <img className='logo' src={logo} alt='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Nav.Link href='Home'>Home</Nav.Link>
            <Nav.Link href='ProfilePage'>Profile</Nav.Link>
            <Nav.Link href='#action2'>Courses</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

            <NavDropdown title='Link' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button
              variant='outline-success'
              style={{ marginBottom: "15px", marginLeft: "15px" }}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
