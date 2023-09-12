import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import waiting from "../assets/waiting.gif";
const UnderDevelopmentPage = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row>
        <Col className="text-center">
          <img
            src={waiting}
            alt="waiting GIF"
            className="img-fluid"
            style={{ height: 200, width: 200 }}
          />
          <h4 className="mt-3"> Cette page est en cours de développement !</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default UnderDevelopmentPage;
