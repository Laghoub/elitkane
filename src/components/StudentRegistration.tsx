import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsValidated, setStudentsValidated] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [filiereList, setFiliereList] = useState([
    "Scientifique",
    "Matheleme",
    "Math-technique",
    "Gestion",
    "Literraire",
    "Langues étrangeres",
  ]);

  const [classesList, setClassesList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentData, setStudentData] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    classe: "",
    filiere: "",
    adresse: "",
    prenomPere: "",
    nomPreMere: "",
    mail: "",
    nomUser: "",
    mdp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Appliquer toUpperCase() aux champs nom et prenom
    if (name === "nom" || name === "prenom") {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(), // Convertir en majuscules
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "https://elitkane.onrender.com/api/class/"
      );
      console.log(response.data);
      setClassesList(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/student",
        studentData
      );
      console.log("Student added:", response.data);

      // Réinitialiser les champs après l'insertion
      setStudentData({
        matricule: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        lieuNaissance: "",
        classe: "",
        filiere: "",
        adresse: "",
        prenomPere: "",
        nomPreMere: "",
        mail: "",
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
              Remarque: Tous les champs sont obligatoire sauf la filiere pour le
              cycle secondaire.
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
                value={studentData.nom}
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
                value={studentData.dateNaissance}
                onChange={handleChange}
                required
              />
              <br />
            </Form.Group>
            <Form.Group controlId="classe">
              <Form.Control
                as="select"
                name="classe"
                value={studentData.classe}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Classe
                </option>
                {classesList.map((classe) => (
                  <option key={classe.idClasse} value={classe.idClasse}>
                    {classe.idClasse}
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
                value={studentData.adresse}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="nomPreMere">
              <Form.Control
                type="text"
                name="nomPreMere"
                placeholder="Nom et Prénom de mere"
                value={studentData.nomPreMere}
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
                value={studentData.nomUser}
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
                value={studentData.prenom}
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
                value={studentData.lieuNaissance}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />

            <Form.Group controlId="filiere">
              <Form.Control
                as="select"
                name="filiere"
                value={studentData.filiere}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Filiere
                </option>
                {filiereList.map((filiere) => (
                  <option key={filiere} value={filiere}>
                    {filiere}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="prenomPere">
              <Form.Control
                type="text"
                name="prenomPere"
                placeholder="Prénom du pere"
                value={studentData.prenomPere}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="mail">
              <Form.Control
                type="text"
                name="mail"
                placeholder="Adresse mail"
                value={studentData.mail}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <h5 style={{ color: "white" }}>.</h5>
            <Form.Group controlId="mdp">
              <Form.Control
                type="password"
                name="mdp"
                placeholder="Mot de passe"
                value={studentData.mdp}
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

export default StudentRegistration;
