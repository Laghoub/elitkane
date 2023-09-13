import React from "react";
import { Modal, Button, Form, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo1.png";
const Menu = () => {
  return (
    <Navbar style={{ backgroundColor: "#e3f2fd" }} expand="lg">
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
          <Nav.Link href="#" style={{ color: "#022634" }}>
            Accueil
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#022634" }}>
            Enseignant
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#022634" }}>
            Étudiant
          </Nav.Link>
          <Nav.Link href="#" style={{ color: "#022634" }}>
            Emploi du temps
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
