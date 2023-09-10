import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import success from "../assets/success1.gif";

const SuccessPage = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row>
        <Col className="text-center">
          <img
            src={success}
            alt="Success GIF"
            className="img-fluid"
            style={{ height: 200, width: 250 }}
          />
          <h1 className="mt-3">Inscription réussie !</h1>
          <p>
            Votre inscription a été effectuée avec succès. votre compte sera
            validé dans un délai de 3 jours, à ce moment, vous pouvez acceder à
            la page de <a href="/"> connexion</a> pour se connecter à votre
            compte.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessPage;
