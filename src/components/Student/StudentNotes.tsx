import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ResponsiveAppBar from "./ResponsiveAppBar";

const StudentNotes = () => {
  type NoteType = {
    matricule: string;
    nomEns: string;
    matiere: string;
    trimestre: string;
    devoir: string;
    note: string;
    observation: string;
  };

  const [allStudentNotes, setAllStudentNotes] = useState([] as NoteType[]);
  const [filteredStudentNotes, setFilteredStudentNotes] = useState(
    [] as NoteType[]
  );
  const [selectedTrimestre, setSelectedTrimestre] = useState("");

  const matricule = localStorage.getItem("matricule");

  useEffect(() => {
    // Récupérez les notes de l'étudiant depuis l'API en utilisant son matricule
    axios
      .get(`https://elitkane.onrender.com/api/note/${matricule}`)
      .then((response) => {
        setAllStudentNotes(response.data.data);
        setFilteredStudentNotes(response.data.data); // Initialisez les notes filtrées avec toutes les notes
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des notes de l'étudiant :",
          error
        );
      });
  }, [matricule]);

  useEffect(() => {
    // Filtrer les notes lorsque le trimestre sélectionné change
    if (selectedTrimestre === "") {
      // Si "Tous les trimestres" sont sélectionnés, affichez toutes les notes
      setFilteredStudentNotes(allStudentNotes);
    } else {
      // Sinon, filtrez les notes par trimestre sélectionné
      const filteredNotes = allStudentNotes.filter(
        (note) => note.trimestre === selectedTrimestre
      );
      setFilteredStudentNotes(filteredNotes);
    }
  }, [selectedTrimestre, allStudentNotes]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrimestre(event.target.value);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <br />
        <h1>Consultation des Notes</h1>
        <br />
        <div className="mb-3">
          <select
            id="filterTrimestre"
            className="form-select"
            value={selectedTrimestre}
            onChange={handleChange}
          >
            <option value="">Tous les trimestres</option>
            <option value="1">Trimestre 1</option>
            <option value="2">Trimestre 2</option>
            <option value="3">Trimestre 3</option>
          </select>
        </div>
        <br />
        {filteredStudentNotes.map((note, index) => (
          <Card key={index} className="mb-4">
            <Card.Body>
              <Card.Title>Matière: {note.matiere}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Enseignant: {note.nomEns}
              </Card.Subtitle>
              <Card.Text>
                Trimestre: {note.trimestre}
                <br />
                {note.devoir}
                <br />
                Note: {note.note} /20
                <br />
                Observation: {note.observation}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentNotes;
