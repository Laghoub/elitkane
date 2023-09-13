import React from "react";
import { Modal, Button, Form, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
const Menu = () => {
  return (
    <Navbar style={{ backgroundColor: "#022634" }} expand="lg">
      <Navbar.Brand>
        <div className="logo">
          <img
            src={logo}
            alt="logo "
            className="img-fluid"
            style={{ height: 80, width: 80 }}
          />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ color: "#022634" }}>
          <Nav.Link href="#" style={{ color: "#e3f2fd" }}>
            Accueil
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#e3f2fd" }}>
            Enseignant
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#e3f2fd" }}>
            Étudiant
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#e3f2fd" }}>
            Emploi du temps
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
