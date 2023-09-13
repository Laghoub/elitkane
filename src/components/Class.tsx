import React from "react";
import { useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Navbar, Nav } from "react-bootstrap";
import Menu from "./Menu";

const Class = () => {
  type ClassType = {
    matricule: string;
    cycle: string;
    niveau: string;
    numero: string;
    idClasse: string;
  };
  const token = localStorage.getItem("token");
  const [cycle, setCycle] = useState("");
  const [niveau, setNiveau] = useState("");
  const [numero, setNumero] = useState("");
  const [classes, setClasses] = useState([] as ClassType[]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [AuthMessage, setAuthMessage] = useState("");
  // la supression
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [classToDeleteId, setClassToDeleteId] = useState("");
  // La modification
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClass, setEditingClass] = useState({
    cycle: "",
    niveau: "",
    numero: "",
    idClasse: "",
  });

  const cycles = ["Primaire", "Moyen", "Scientifique", "Gestion", "Literraire"];

  const AddClass = async (e: any) => {
    e.preventDefault();

    const newClass = {
      cycle: cycle,
      niveau: niveau,
      numero: numero,
    };

    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/class",
        newClass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === 1) {
        setSuccessMessage("Classe insérée avec succès");
      } else {
        setErrorMessage(
          "La classe ne peut pas etre inséré, car elle existe déja."
        );
      }

      fetchClasses();
      console.log(response.data);
      // Réinitialiser les champs après l'insertion
      setCycle("");
      setNiveau("");
      setNumero("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "La classe ne peut pas etre inséré, car elle existe déja."
      );
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "https://elitkane.onrender.com/api/class"
      );
      if (response.data.success == 1) {
        setClasses(response.data.data);
      } else {
        setAuthMessage("Vous n'etes pas autorisé à consulter cette liste");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleDelete = async (idClasse: string) => {
    try {
      await axios.delete(
        `https://elitkane.onrender.com/api/class/${idClasse}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchClasses();
    } catch (error) {
      console.log(idClasse);
      console.error("Error deleting class:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const showConfirmation = (idClasse: string) => {
    setClassToDeleteId(idClasse);
    setShowConfirmationModal(true);
  };

  const hideConfirmation = () => {
    setShowConfirmationModal(false);
    setClassToDeleteId("");
  };

  const deleteHide = (idClasse: string) => {
    handleDelete(idClasse);
    hideConfirmation();
    setSuccessMessage("");
  };

  const openEditModal = (classe: any) => {
    setEditingClass(classe);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingClass({
      cycle: "",
      niveau: "",
      numero: "",
      idClasse: "",
    });
    setShowEditModal(false);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `https://elitkane.onrender.com/api/class/${editingClass.idClasse}`,
        editingClass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchClasses();
      closeEditModal();
    } catch (error) {
      console.error("Error editing class:", error);
    }
  };

  const filteredClasses = selectedCycle
    ? classes.filter((classe) => classe.cycle === selectedCycle)
    : classes;

  return (
    <div className="container mt-5">
      <Menu />
      <br />
      <h1 style={{ color: "#022634" }}>Gestion des classes</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="mb-3">
        <label
          htmlFor="cycle"
          className="form-label"
          style={{ color: "#022634" }}
        >
          Cycle
        </label>
        <select
          id="cycle"
          className="form-select"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          required
        >
          <option value="" disabled style={{ color: "#e3f2fd" }}>
            Sélectionner un cycle
          </option>
          {cycles.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="niveau"
          className="form-label"
          style={{ color: "#022634" }}
        >
          Niveau
        </label>
        <input
          type="text"
          id="niveau"
          className="form-control"
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          required
        />
      </div>
      <div className="mb-3" style={{ color: "#022634" }}>
        <label htmlFor="numero" className="form-label">
          Numéro
        </label>
        <input
          type="text"
          id="numero"
          className="form-control"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={AddClass}>
        Ajouter la classe
      </button>

      <div className="col-md-12">
        {/* List of Classes section */}
        <div className="mt-4">
          <h1 style={{ color: "#022634" }}>Liste des Classes</h1>
          <br />
          <div className="mb-3">
            <select
              id="filterCycle"
              className="form-select"
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
            >
              <option value="">Tous les cycles</option>
              {cycles.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Cycle</th>
                <th>Niveau</th>
                <th>Numéro</th>
                <th>ID de classe</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.map((classe, index) => (
                <tr key={classe.idClasse}>
                  <td>{classe.cycle}</td>
                  <td>{classe.niveau}</td>
                  <td>{classe.numero}</td>
                  <td>{classe.idClasse}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => openEditModal(classe)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => showConfirmation(classe.idClasse)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {AuthMessage && (
            <div className="alert alert-danger">{AuthMessage}</div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={hideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous etes sur le points de supprimer la classe {classToDeleteId}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirmation}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => deleteHide(classToDeleteId)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une classe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cycle">
              <Form.Label>Cycle</Form.Label>
              <Form.Control
                type="text"
                value={editingClass.cycle}
                onChange={(e) =>
                  setEditingClass({ ...editingClass, cycle: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="niveau">
              <Form.Label>Niveau</Form.Label>
              <Form.Control
                type="text"
                value={editingClass.niveau}
                onChange={(e) =>
                  setEditingClass({ ...editingClass, niveau: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="numero">
              <Form.Label>Numéro</Form.Label>
              <Form.Control
                type="text"
                value={editingClass.numero}
                onChange={(e) =>
                  setEditingClass({ ...editingClass, numero: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Class;
