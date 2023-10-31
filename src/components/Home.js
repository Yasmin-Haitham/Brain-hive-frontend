import React from "react";
import NavbarComponent from "./NavbarComponent";
import Leaderboard from "./Leaderboard";
import MultFeed from "./MultFeed";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <div>
      <NavbarComponent />
      <div
        className='home-Container'
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: "20px",
          width: "100%",
        }}>
        <Row style={{ display: "flex" }}>
          <Col>
            <Leaderboard />
          </Col>
          <Col>
            <MultFeed />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Home;
