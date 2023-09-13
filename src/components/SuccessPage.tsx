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
            Votre inscription a été effectuée avec succès. Vous recevrez un
            e-mail indiquant que votre compte a été validé par l'administration
            de l'école. À ce moment-là, vous pourrez accéder à la page de{" "}
            <a href="/">connexion</a> pour vous connecter à votre compte.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessPage;
