import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";
import Menu from "./Menu";

const Teacher = () => {
  type ClassType = {
    matricule: string;
    cycle: string;
    niveau: string;
    numero: string;
    idClasse: string;
  };

  type AffectationType = {
    matricule: string;
    nom: string;
    prenom: string;
    matiereEnseignee: string;
    idClasse: string;
  };

  type TeacherType = {
    matricule: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    matiereEnseignee: string;
    adresse: string;
    ensEtat: string;
    email: string;
    nomUser: string;
    mdp: string;
  };
  const validation = "0";
  const finalValidation = "1";
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("inscription");
  const [showToast, setShowToast] = useState(false);
  const [teachers, setTeachers] = useState([] as TeacherType[]);
  const [affectations, setAffectations] = useState([] as AffectationType[]);
  const [teachersValidated, setTeachersValidated] = useState(
    [] as TeacherType[]
  );
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
  const [searchTerm, setSearchTerm] = useState("");
  const [matriculeTeacher, setmatriculeTeacher] = useState("");
  const [idClasseTeacher, setidClasseTeacher] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [teacherToDeleteId, setTeacherToDeleteId] = useState("");
  const [editingTeacher, setEditingTeacher] = useState({
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

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [classesList, setClassesList] = useState([] as ClassType[]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [TeacherData, setTeacherData] = useState({
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

  const fetchTeachers = async (validation: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/teacher/${validation}`
      );

      if (response.data.success === 1) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Teachers:", error);
    }
  };

  const fetchValidatedTeachers = async (finalValidation: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/teacher/${finalValidation}`
      );

      if (response.data.success === 1) {
        setTeachersValidated(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Teachers:", error);
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
    fetchTeachers(validation);
    fetchValidatedTeachers(finalValidation);
    fetchAffectations();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/teacher",
        TeacherData
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
      setShowToast(true);
    } catch (error) {
      console.error("Error adding Teacher:", error);
    }
  };

  const handleDelete = async (matricule: string) => {
    try {
      await axios.delete(
        `https://elitkane.onrender.com/api/teacher/${matricule}`
      );
      fetchTeachers(validation); // Mettre à jour la liste des étudiants après la suppression
    } catch (error) {
      console.error("Error deleting Teacher:", error);
    }
  };

  const showConfirmation = (matricule: string) => {
    setTeacherToDeleteId(matricule);
    setShowConfirmationModal(true);
  };
  const hideConfirmation = () => {
    setShowConfirmationModal(false);
    setTeacherToDeleteId("");
  };

  const deleteHide = (matricule: string) => {
    handleDelete(matricule);
    hideConfirmation();
  };
  const openEditModal = (Teacher: any) => {
    setEditingTeacher(Teacher);
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `https://elitkane.onrender.com/api/teacher/${editingTeacher.matricule}`,
        editingTeacher
      );
      fetchTeachers(validation);
      fetchValidatedTeachers(finalValidation);
      closeEditModal();
    } catch (error) {
      console.error("Error editing Teacher:", error);
    }
  };

  const AddTeacher = async (e: any) => {
    e.preventDefault();

    const newUser = {
      matricule: editingTeacher.matricule,
      role: "enseignant",
      nom: editingTeacher.nom,
      email: editingTeacher.nomUser,
      mdp: editingTeacher.mdp,
    };

    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/users",
        newUser
      );
    } catch (error) {
      console.log("error");
    }
  };

  const AddAffectation = async (e: any) => {
    e.preventDefault();

    const newAffectation = {
      matricule: matriculeTeacher,
      idClasse: idClasseTeacher,
    };

    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/affectation",
        newAffectation
      );

      if (response.data.success === 1) {
        setSuccessMessage("L'affectation a été faite avec succès");
      } else {
        setErrorMessage(
          "L'affectation ne peut pas etre inséré, car elle existe déja."
        );
      }

      fetchClasses();
      fetchTeachers(validation);
      fetchValidatedTeachers(finalValidation);
      console.log(response.data);
      // Réinitialiser les champs après l'insertion
      setmatriculeTeacher("");
      setidClasseTeacher("");
      setErrorMessage("");
      setSuccessMessage("");
    } catch (error) {
      setErrorMessage(
        "L'affectation ne peut pas etre inséré, car elle existe déja."
      );
    }
  };

  const fetchAffectations = async () => {
    try {
      const response = await axios.get(
        "https://elitkane.onrender.com/api/affectation"
      );
      if (response.data.success == 1) {
        setAffectations(response.data.data);
      } else {
        console.log("not authorized");
      }
    } catch (error) {
      console.error("Error fetching affectations:", error);
    }
  };

  const closeEditModal = () => {
    setEditingTeacher({
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
    setShowEditModal(false);
  };

  const filteredTeachersValidated = teachersValidated.filter((Teacher) => {
    const classFilter = !selectedClass;
    const searchFilter =
      !searchTerm ||
      Teacher.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return classFilter && searchFilter;
  });

  const filteredTeachers = teachers.filter((teacher) => {
    const classFilter = !selectedClass;
    const searchFilter =
      !searchTerm ||
      teacher.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return classFilter && searchFilter;
  });

  const filteredAffectations = affectations.filter((affectation) => {
    const classFilter =
      !selectedClass || affectation.idClasse === selectedClass;
    const searchFilter =
      !searchTerm ||
      affectation.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return classFilter && searchFilter;
  });

  return (
    <div className="container mt-5">
      <Menu />
      <div
        className="row justify-content-center align-items-center login-container"
        style={{ marginTop: "70px" }}
      ></div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "inscription" ? "active" : ""}
            onClick={() => toggleTab("inscription")}
          >
            Inscription
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "validation" ? "active" : ""}
            onClick={() => toggleTab("validation")}
          >
            Validation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "listesFinales" ? "active" : ""}
            onClick={() => toggleTab("listesFinales")}
          >
            Listes finales
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={activeTab === "affectation" ? "active" : ""}
            onClick={() => toggleTab("affectation")}
          >
            Affectation
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="inscription">
          <br />
          <div className="container mt-5">
            <div
              className="card mb-3"
              style={{ backgroundColor: "#03A9F4", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">La pré-inscription</h5>
                <p className="card-text">
                  Dans cette étape, vous devez saisir tous les champs du
                  formulaire d'inscription, une fois votre compte sera validé
                  par l'administration vous pouvez vous connecter avec votre nom
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
                      value={TeacherData.nom}
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
                      value={TeacherData.dateNaissance}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="matiereEnseignee">
                    <Form.Control
                      as="select"
                      name="matiereEnseignee"
                      value={TeacherData.matiereEnseignee}
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
                      value={TeacherData.adresse}
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
                      value={TeacherData.nomUser}
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
                      value={TeacherData.prenom}
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
                      value={TeacherData.lieuNaissance}
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
                      value={TeacherData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="ensEtat">
                    <Form.Control
                      as="select"
                      name="ensEtat"
                      value={TeacherData.ensEtat}
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
                      value={TeacherData.mdp}
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
                Veuillez bien noter vos informations de connexion afin de les
                utiliser dans la section "connexion"
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
        </TabPane>

        <TabPane tabId="validation">
          <div className="container mt-5">
            {/* ... Autres éléments ... */}
            <div className="col-md-12">
              <div className="mt-4">
                <h3>Liste des pré-inscription</h3>
                <br />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Toutes les classes</option>
                  {classesList.map((classe) => (
                    <option key={classe.idClasse} value={classe.idClasse}>
                      {classe.idClasse}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rechercher par nom"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      Rechercher
                    </button>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date de Naissance</th>
                      <th>matiere</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((Teacher: any, index: any) => (
                      <tr key={index}>
                        <td>{Teacher.matricule}</td>
                        <td>{Teacher.nom}</td>
                        <td>{Teacher.prenom}</td>
                        <td>{Teacher.dateNaissance}</td>
                        <td>{Teacher.matiereEnseignee}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => openEditModal(Teacher)}
                          >
                            Valider
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => showConfirmation(Teacher.matricule)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal show={showConfirmationModal} onHide={hideConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Vous etes sur le point de supprimer l'inscription N°{" "}
                {teacherToDeleteId}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={hideConfirmation}>
                  Annuler
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteHide(teacherToDeleteId)}
                >
                  Supprimer
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={closeEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>valider une inscription</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {/* ... Autres champs ... */}
                  <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTeacher.nom}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          nom: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="prenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTeacher.prenom}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          prenom: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="dateNaissance">
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control
                      type="date"
                      value={editingTeacher.dateNaissance}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          dateNaissance: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="lieuNaissance">
                    <Form.Label>Lieu de naissance</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTeacher.lieuNaissance}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          lieuNaissance: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="matiereEnseignee">
                    <Form.Label>matiere Enseignée</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTeacher.matiereEnseignee}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          matiereEnseignee: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="ensEtat">
                    <Form.Label>Enseignant à l'état</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTeacher.ensEtat}
                      onChange={(e) =>
                        setEditingTeacher({
                          ...editingTeacher,
                          ensEtat: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  {/* ... Autres champs ... */}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeEditModal}>
                  Annuler
                </Button>

                <Button variant="primary" onClick={AddTeacher}>
                  Ajouter le compte
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                  valider
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </TabPane>
        <TabPane tabId="listesFinales">
          <div className="container mt-5">
            {/* ... Autres éléments ... */}
            <div className="col-md-12">
              <div className="mt-4">
                <h3>Liste finale</h3>
                <br />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Toutes les classes</option>
                  {classesList.map((classe) => (
                    <option key={classe.idClasse} value={classe.idClasse}>
                      {classe.idClasse}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rechercher par nom"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      Rechercher
                    </button>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date de Naissance</th>
                      <th>Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachersValidated.map((student, index) => (
                      <tr key={index}>
                        <td>{student.matricule}</td>
                        <td>{student.nom}</td>
                        <td>{student.prenom}</td>
                        <td>{student.dateNaissance}</td>
                        <td>{student.matiereEnseignee}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => openEditModal(student)}
                          >
                            modifier
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => showConfirmation(student.matricule)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tabId="affectation">
          <div className="container mt-5">
            <h1>Gestion des affectations</h1>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="mb-3">
              <Form>
                <Form.Group controlId="Enseignant">
                  <Form.Control
                    as="select"
                    name="Enseignant"
                    value={matriculeTeacher}
                    onChange={(e) => setmatriculeTeacher(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Enseignant
                    </option>
                    {teachersValidated.map((enseignant) => (
                      <option
                        key={enseignant.matricule}
                        value={enseignant.matricule}
                      >
                        {enseignant.nom + " " + enseignant.prenom}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId="classe">
                  <Form.Control
                    as="select"
                    name="classe"
                    value={idClasseTeacher}
                    onChange={(e) => setidClasseTeacher(e.target.value)}
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
              </Form>

              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={AddAffectation}
              >
                Affecter
              </button>
            </div>
          </div>
          <br />
          <div className="col-md-12">
            {/* List of Classes section */}
            <div className="mt-4">
              <h1>Liste des affectations</h1>
              <br />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Toutes les classes</option>
                {classesList.map((classe) => (
                  <option key={classe.idClasse} value={classe.idClasse}>
                    {classe.idClasse}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher par nom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Rechercher
                  </button>
                </div>
              </div>
              <br />

              <table className="table">
                <thead>
                  <tr>
                    <th>matricule</th>
                    <th>Nom</th>
                    <th>prénom</th>
                    <th>Matiere</th>
                    <th>Classe</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAffectations.map((affectation, index) => (
                    <tr key={affectation.matricule}>
                      <td>{affectation.matricule}</td>
                      <td>{affectation.nom}</td>
                      <td>{affectation.prenom}</td>
                      <td>{affectation.matiereEnseignee}</td>
                      <td>{affectation.idClasse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Teacher;
