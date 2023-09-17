import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [parents, setParents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [parentData, setParentData] = useState({
    matricule: "",
    nomPere: "",
    prenomPere: "",
    telephonePere: "",
    telephoneMere: "",
    adresse: "",
    statutDivorce: "",
    prenomsEnfant: "",
    mail: "",
    username: "",
    mdp: "",
  });

  const [statutDivorce, setStatutDivorce] = useState([
    "Divorcés",
    "Non divorcé",
  ]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Appliquer toUpperCase() aux champs nom et prenom
    if (name === "nom" || name === "prenom") {
      setParentData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(), // Convertir en majuscules
      }));
    } else {
      setParentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (parentData.mdp !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    } else {
      if (parentData.nomPere == "" && parentData.prenomPere == "") {
        setErrorMessage("Vous devez remplir tous les champs du formulaire");
      } else {
        try {
          const response = await axios.post(
            "https://elitkane.onrender.com/api/parent",
            parentData
          );
          console.log("Parent added:", response.data);

          // Réinitialiser les champs après l'insertion
          setParentData({
            matricule: "",
            nomPere: "",
            prenomPere: "",
            telephonePere: "",
            telephoneMere: "",
            adresse: "",
            statutDivorce: "",
            prenomsEnfant: "",
            mail: "",
            username: "",
            mdp: "",
          });
          setShowToast(false);
          navigate("/successRegistration");
        } catch (error) {
          console.error("Error adding Parent:", error);
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 style={{ color: "#022634" }}>Inscription "Parent d'élève"</h1>
      <br />
      <div
        className="card mb-3"
        style={{ backgroundColor: "#B3E5FC", color: "#022634" }}
      >
        <div className="card-body">
          <h5 className="card-title">La pré-inscription</h5>
          <p className="card-text">
            Dans cette étape, vous devez remplir tous les champs du formulaire
            d'inscription. Une fois votre compte validé par l'administration,
            vous pourrez vous connecter avec votre nom d'utilisateur et votre
            mot de passe.
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              Remarque: Tous les champs sont obligatoires.
            </small>
          </p>
        </div>
      </div>
      <h5 style={{ color: "#022634" }}>Les informations personnelles</h5>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nomPere">
              <Form.Control
                type="text"
                name="nomPere"
                placeholder="Nom du père"
                value={parentData.nomPere}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="prenomPere">
              <Form.Control
                type="text"
                name="prenomPere"
                placeholder="Prénom du père"
                value={parentData.prenomPere}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="telephonePere">
              <Form.Control
                type="number"
                name="telephonePere"
                placeholder="N°Tél du père "
                value={parentData.telephonePere}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="telephoneMere">
              <Form.Control
                type="number"
                name="telephoneMere"
                placeholder="N°Tél de la mere "
                value={parentData.telephoneMere}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="adresse">
              <Form.Control
                type="text"
                name="adresse"
                placeholder="Votre adresse"
                value={parentData.adresse}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="statutDivorce">
              <Form.Control
                type="text"
                name="adresse"
                placeholder="Votre adresse"
                value={parentData.adresse}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="statutDivorce">
              <Form.Control
                as="select"
                name="statutDivorce"
                value={parentData.statutDivorce}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  situation des parents
                </option>
                {statutDivorce.map((statut) => (
                  <option key={statut} value={statut}>
                    {statut}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="prenomsEnfant">
              <Form.Control
                type="text"
                name="prenomsEnfant"
                placeholder="Les noms de vos enfants séparés par une virgule"
                value={parentData.prenomsEnfant}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="mail">
              <Form.Control
                type="text"
                name="mail"
                placeholder="Votre adresse mail"
                value={parentData.mail}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <h5 style={{ color: "#022634" }}>Les informations de connexion</h5>
            <br />
            <i>
              <p style={{ color: "#022634" }}>
                Le nom d'utilisateur doit être constitué de la première lettre
                de votre prénom suivie d'un tiret '_' suivi de votre nom. Par
                exemple, pour un prénom Nassim et un nom Laghoub, le nom
                d'utilisateur serait :{" "}
                <span style={{ color: "#022634" }}>
                  <b>n_laghoub</b>
                </span>
              </p>{" "}
            </i>

            <br />
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={parentData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="mdp">
              <Form.Control
                type="password"
                name="mdp"
                placeholder="Mot de passe"
                value={parentData.mdp}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="confirmPassword">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br />
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
          </Col>
        </Row>{" "}
        <br />
        <h5 style={{ color: "#F44336" }}>
          Assurez-vous que toutes les informations saisies sont correctes.
        </h5>
        <h6 style={{ color: "#022634" }}>
          Veuillez bien noter vos informations de connexion afin de les utiliser
          dans la section "connexion"
        </h6>
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Je soumets mon inscription
        </Button>
        <br />
      </Form>
      <br />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#28a745", // Couleur de fond du toast
          color: "#ffffff", // Couleur du texte du toast
        }}
        delay={3000} // Durée d'affichage du toast (en millisecondes)
        autohide
      >
        <Toast.Body>Inscription effectuée avec succes.</Toast.Body>
      </Toast>
    </div>
  );
};

export default ParentRegistration;
