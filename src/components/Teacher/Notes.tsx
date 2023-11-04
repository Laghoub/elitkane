import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Notes = () => {
  type ClassType = {
    matricule: string;
    cycle: string;
    niveau: string;
    numero: string;
    idClasse: string;
  };

  type studentType = {
    matricule: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    classe: string;
    filiere: string;
    adresse: string;
    prenomPere: string;
    nomPreMere: string;
    mail: string;
    note: string;
    observation: string;
  };
  const [classes, setClasses] = useState([] as ClassType[]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTrimestre, setSelectedTrimestre] = useState("1");
  const [selectedDevoir, setSelectedDevoir] = useState("Devoir 1");
  const [students, setStudents] = useState([] as studentType[]);
  const [notes, setNotes] = useState(
    [] as { note: string; observation: string }[]
  );
  const matricule = localStorage.getItem("matricule");

  useEffect(() => {
    // Récupérez la liste des classes de l'enseignant à partir de l'API
    axios
      .get(
        `https://elitkane.onrender.com/api/teacher/classteacher/${matricule}`
      )
      .then((response) => {
        setClasses(response.data.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement des classes :", error);
      });
  }, []);

  const handleClassChange = (e: any) => {
    setSelectedClass(e.target.value);
  };

  const handleTrimestreChange = (e: any) => {
    setSelectedTrimestre(e.target.value);
  };

  const handleDevoirChange = (e: any) => {
    setSelectedDevoir(e.target.value);
  };
  const handleNoteChange = (matricule: any, note: string) => {
    // Mettre à jour la note pour l'étudiant avec le matricule donné
    setNotes((prevNotes) => ({
      ...prevNotes,
      [matricule]: {
        ...prevNotes[matricule],
        note: note,
      },
    }));
  };

  const handleObservationChange = (matricule: any, observation: string) => {
    // Mettre à jour l'observation pour l'étudiant avec le matricule donné
    setNotes((prevNotes) => ({
      ...prevNotes,
      [matricule]: {
        ...prevNotes[matricule],
        observation: observation,
      },
    }));
  };

  const handleFetchStudents = () => {
    // Récupérer la liste des étudiants pour la classe sélectionnée depuis l'API
    axios
      .get(`https://elitkane.onrender.com/api/student/class/${selectedClass}`)
      .then((response) => {
        setStudents(response.data.data);
        // Initialiser les notes et observations avec des tableaux vides pour chaque étudiant
        setNotes(response.data.data.map(() => ({ note: "", observation: "" })));
      })
      .catch((error) => {
        console.error("Erreur de chargement des étudiants :", error);
      });
  };

  const handleNoter = (index: number) => {
    // Effectuer la requête POST vers l'API avec les détails de la note
    const student = students[index];
    const noteData = {
      matricule: student.matricule,
      nomEns: localStorage.getItem("name"),
      matiere: "Mathématiques",
      trimestre: selectedTrimestre,
      devoir: selectedDevoir,
      note: notes[index].note,
      observation: notes[index].observation,
    };

    axios
      .post("https://elitkane.onrender.com/api/note", noteData)
      .then((response) => {
        // Mettre à jour le tableau de notes pour marquer que la note a été attribuée
        const updatedNotes = [...notes];
        updatedNotes[index] = { note: "Attribuée", observation: "" };
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error("Erreur de requête POST :", error);
      });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <br />
        <h1>Page de Saisie des Notes</h1>
        <br />
        <Form>
          <Form.Group controlId="selectedClass">
            <Form.Label>Classe</Form.Label>
            <Form.Control
              as="select"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">Sélectionnez une classe</option>
              {classes.map((classe) => (
                <option key={classe.idClasse} value={classe.idClasse}>
                  {classe.idClasse}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="selectedTrimestre">
            <Form.Label>Trimestre</Form.Label>
            <Form.Control
              as="select"
              value={selectedTrimestre}
              onChange={handleTrimestreChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="selectedDevoir">
            <Form.Label>Devoir</Form.Label>
            <Form.Control
              as="select"
              value={selectedDevoir}
              onChange={handleDevoirChange}
            >
              <option value="Devoir 1">Devoir 1</option>
              <option value="Devoir 2">Devoir 2</option>
              <option value="Examen">Examen</option>
            </Form.Control>
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleFetchStudents}>
            Afficher les étudiants
          </Button>
        </Form>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Note</th>
              <th>Observation</th>
              <th>Noter</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.matricule}>
                <td>{student.matricule}</td>
                <td>{student.nom}</td>
                <td>{student.prenom}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={notes[index].note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={notes[index].observation}
                    onChange={(e) =>
                      handleObservationChange(index, e.target.value)
                    }
                  />
                </td>
                <td>
                  <Button
                    variant={
                      notes[index].note === "Attribuée" ? "success" : "primary"
                    }
                    onClick={() => handleNoter(index)}
                    disabled={notes[index].note === "Attribuée"}
                  >
                    {notes[index].note === "Attribuée"
                      ? "Note attribuée"
                      : "Rendre la note"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notes;
