import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  type ClassType = {
    matricule: string;
    cycle: string;
    niveau: string;
    numero: string;
    idClasse: string;
  };
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsValidated, setStudentsValidated] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [filiereList, setFiliereList] = useState([
    "Scientifique",
    "Matheleme",
    "Math-technique",
    "Gestion",
    "Literraire",
    "Langues étrangeres",
    "Pas de filière",
  ]);

  const [classesList, setClassesList] = useState([] as ClassType[]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleChange = (e: any) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (studentData.mdp !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    } else {
      if (
        studentData.nom == "" &&
        studentData.prenom == "" &&
        studentData.dateNaissance == "" &&
        studentData.lieuNaissance == "" &&
        studentData.classe == "" &&
        studentData.nomUser == "" &&
        studentData.mdp == "" &&
        studentData.nomPreMere == "" &&
        studentData.prenomPere == ""
      ) {
        setErrorMessage("Vous devez remplir tous les champs du formulaire");
      } else {
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
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 style={{ color: "#022634" }}>Inscription "Etudiant"</h1>
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
              Remarque : Tous les champs sont obligatoires.
            </small>
          </p>
        </div>
      </div>
      <h5 style={{ color: "#022634" }}>Les informations personnelles</h5>
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
            <p style={{ color: "#022634" }}>Date de naissance</p>
            <Form.Group controlId="dateNaissance">
              <Form.Control
                type="date"
                name="dateNaissance"
                placeholder="Date de naissance"
                value={studentData.dateNaissance}
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

            {/* Ajouter les autres champs ici */}
          </Col>
          <Col md={6}>
            <h5 style={{ color: "#022634" }}>Les informations de connexion</h5>
            <br />
            <i>
              <p style={{ color: "022634" }}>
                Le nom d'utilisateur doit être constitué de la première lettre
                de votre prénom suivie d'un tiret '_' suivi de votre nom. Par
                exemple, pour un prénom Islem et un nom Bouadla, le nom
                d'utilisateur serait :{" "}
                <span style={{ color: "#022634" }}>
                  <b>i_bouadla</b>
                </span>
              </p>{" "}
            </i>
            <Form.Group controlId="nomUser">
              <Form.Control
                type="text"
                name="nomUser"
                placeholder="Votre nom d'utilisateur"
                value={studentData.nomUser}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="mdp">
              <Form.Control
                type="password"
                name="mdp"
                placeholder="Votre mot de passe"
                value={studentData.mdp}
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
        <h6 style={{ color: "022634" }}>
          Veuillez bien noter vos informations de connexion afin de les utiliser
          dans la section 'connexion'.
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
