import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsValidated, setStudentsValidated] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [ensEtat, setensEtat] = useState(["Oui", "Non"]);
  const [matiereList, setMatiereList] = useState([
    "Mathématiques",
    "Langue Arabe",
    "Français",
    "Anglais",
    "Histoire-Géographie",
    "Physique-Chimie",
    "Sciences de la Vie et de la Terre",
    "Comptabililé",
    "Economie",
    "Droit",
    "Sciences islamique",
    "Education islamique",
    "Education civile",
    "Philosophie",
    "Espagnol",
    "Éducation Physique et Sportive",
    "Dessin",
    "Informatique",
  ]);

  const [classesList, setClassesList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [teacherData, setTeacherData] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    matiereEnseignee: "",
    adresse: "",
    ensEtat: "",
    email: "",
    nomUser: "",
    mdp: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Appliquer toUpperCase() aux champs nom et prenom
    if (name === "nom" || name === "prenom") {
      setTeacherData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(), // Convertir en majuscules
      }));
    } else {
      setTeacherData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/teacher",
        teacherData
      );
      console.log("Teacher added:", response.data);

      // Réinitialiser les champs après l'insertion
      setTeacherData({
        matricule: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        matiereEnseignee: "",
        adresse: "",
        ensEtat: "",
        email: "",
        nomUser: "",
        mdp: "",
      });
      setShowToast(false);
      navigate("/successRegistration");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Inscription "Enseignant"</h1>
      <div
        className="card mb-3"
        style={{ backgroundColor: "#03A9F4", color: "white" }}
      >
        <div className="card-body">
          <h5 className="card-title">La pré-inscription</h5>
          <p className="card-text">
            Dans cette étape, vous devez saisir tous les champs du formulaire
            d'inscription, une fois votre compte sera validé par
            l'administration vous pouvez vous connecter avec votre nom
            d'utilisateur et votre mot de passe.
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              Remarque: Tous les champs sont obligatoires.
            </small>
          </p>
        </div>
      </div>
      <h5>Les informations personnelles</h5>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nom">
              <Form.Control
                type="text"
                name="nom"
                placeholder="Nom"
                value={teacherData.nom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="dateNaissance">
              <Form.Control
                type="date"
                name="deteNaissance"
                placeholder="Date de naissance"
                value={teacherData.dateNaissance}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="matiereEnseignee">
              <Form.Control
                as="select"
                name="matiereEnseignee"
                value={teacherData.matiereEnseignee}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Matiere Enseignée
                </option>
                {matiereList.map((matiere) => (
                  <option key={matiere} value={matiere}>
                    {matiere}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="adresse">
              <Form.Control
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={teacherData.adresse}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <br />
            <h5>Les informations de connexion</h5>
            <Form.Group controlId="nomUser">
              <Form.Control
                type="text"
                name="nomUser"
                placeholder="Nom d'utilisateur"
                value={teacherData.nomUser}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Ajouter les autres champs ici */}
          </Col>
          <Col md={6}>
            <Form.Group controlId="prenom">
              <Form.Control
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={teacherData.prenom}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="lieuNaissance">
              <Form.Control
                type="text"
                name="lieuNaissance"
                placeholder="Lieu de naissance"
                value={teacherData.lieuNaissance}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <br />
            <Form.Group controlId="email">
              <Form.Control
                type="text"
                name="email"
                placeholder="Adresse mail"
                value={teacherData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="ensEtat">
              <Form.Control
                as="select"
                name="ensEtat"
                value={teacherData.ensEtat}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Enseignez-vous à l'état ?
                </option>
                {ensEtat.map((ensetat) => (
                  <option key={ensetat} value={ensetat}>
                    {ensetat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <h5 style={{ color: "white" }}>.</h5>
            <Form.Group controlId="mdp">
              <Form.Control
                type="password"
                name="mdp"
                placeholder="Mot de passe"
                value={teacherData.mdp}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>{" "}
        <br />
        <h5>
          Assurez-vous que toutes les informations saisies sont correctes.
        </h5>
        <h6>
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

export default TeacherRegistration;
