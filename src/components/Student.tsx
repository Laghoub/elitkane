import React from "react";
import { useState, ReactNode, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";

const Student = () => {
  type StudentType = {
    matricule: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    classe: string;
    filiere: string;
    adresse: string;
    prenomPere: string;
    nomMere: string;
    mail: string;
    nomUser: string;
    mdp: string;
  };

  type ClassType = {
    matricule: string;
    cycle: string;
    niveau: string;
    numero: string;
    idClasse: string;
  };
  const validation = "0";
  const finalValidation = "1";
  const [activeTab, setActiveTab] = useState("inscription");
  const [showToast, setShowToast] = useState(false);
  const [students, setStudents] = useState([] as StudentType[]);
  const [studentsValidated, setStudentsValidated] = useState(
    [] as StudentType[]
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [filiereList, setFiliereList] = useState([
    "Scientifique",
    "Matheleme",
    "Math-technique",
    "Gestion",
    "Literraire",
    "Langues étrangeres",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentToDeleteId, setStudentToDeleteId] = useState("");
  const [editingStudent, setEditingStudent] = useState({
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

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [classesList, setClassesList] = useState([] as ClassType[]);
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

  const fetchStudents = async (validation: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/student/${validation}`
      );

      if (response.data.success === 1) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchValidatedStudents = async (finalValidation: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/student/${finalValidation}`
      );

      if (response.data.success === 1) {
        setStudentsValidated(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
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
    fetchStudents(validation);
    fetchValidatedStudents(finalValidation);
  }, []);

  const handleSubmit = async (e: any) => {
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
      setShowToast(true);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDelete = async (matricule: string) => {
    try {
      await axios.delete(
        `https://elitkane.onrender.com/api/student/${matricule}`
      );
      fetchStudents(validation); // Mettre à jour la liste des étudiants après la suppression
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const showConfirmation = (matricule: string) => {
    setStudentToDeleteId(matricule);
    setShowConfirmationModal(true);
  };
  const hideConfirmation = () => {
    setShowConfirmationModal(false);
    setStudentToDeleteId("");
  };

  const deleteHide = (matricule: string) => {
    handleDelete(matricule);
    hideConfirmation();
  };
  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `https://elitkane.onrender.com/api/student/${editingStudent.matricule}`,
        editingStudent
      );
      fetchStudents(validation);
      fetchValidatedStudents(finalValidation);
      closeEditModal();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const AddStudent = async (e: any) => {
    e.preventDefault();

    const newUser = {
      matricule: editingStudent.matricule,
      role: "étudiant",
      nom: editingStudent.nom,
      email: editingStudent.nomUser,
      mdp: editingStudent.mdp,
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

  const closeEditModal = () => {
    setEditingStudent({
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
    setShowEditModal(false);
  };
  const filteredStudents = students.filter((student) => {
    const classFilter = !selectedClass || student.classe === selectedClass;
    const searchFilter =
      !searchTerm ||
      student.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return classFilter && searchFilter;
  });

  const filteredStudentsValidated = studentsValidated.filter((student) => {
    const classFilter = !selectedClass || student.classe === selectedClass;
    const searchFilter =
      !searchTerm ||
      student.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return classFilter && searchFilter;
  });

  return (
    <div className="container">
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
                    Remarque: Tous les champs sont obligatoire sauf la filiere
                    pour le cycle secondaire.
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
                      <th>Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student: any, index: any) => (
                      <tr key={index}>
                        <td>{student.matricule}</td>
                        <td>{student.nom}</td>
                        <td>{student.prenom}</td>
                        <td>{student.dateNaissance}</td>
                        <td>{student.classe}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => openEditModal(student)}
                          >
                            Valider
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
            <Modal show={showConfirmationModal} onHide={hideConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Vous etes sur le point de supprimer l'inscription N°{" "}
                {studentToDeleteId}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={hideConfirmation}>
                  Annuler
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteHide(studentToDeleteId)}
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
                      value={editingStudent.nom}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
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
                      value={editingStudent.prenom}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
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
                      value={editingStudent.dateNaissance}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
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
                      value={editingStudent.lieuNaissance}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          lieuNaissance: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="classe">
                    <Form.Label>Classe</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingStudent.classe}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          classe: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="filiere">
                    <Form.Label>Filiere</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingStudent.filiere}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          filiere: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="mail">
                    <Form.Label>Mail</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingStudent.mail}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          mail: e.target.value,
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

                <Button variant="primary" onClick={AddStudent}>
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
                    {filteredStudentsValidated.map(
                      (student: any, index: any) => (
                        <tr key={index}>
                          <td>{student.matricule}</td>
                          <td>{student.nom}</td>
                          <td>{student.prenom}</td>
                          <td>{student.dateNaissance}</td>
                          <td>{student.classe}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => openEditModal(student)}
                            >
                              modifier
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() =>
                                showConfirmation(student.matricule)
                              }
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Student;
