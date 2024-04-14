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
  const [selectedMatiere, setSelectedMatiere] = useState("");

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
    // Filtrer les notes lorsque le trimestre ou la matière sélectionnée change
    const filteredByTrimestre =
      selectedTrimestre === ""
        ? allStudentNotes
        : allStudentNotes.filter(
            (note) => note.trimestre === selectedTrimestre
          );

    const filteredByMatiere =
      selectedMatiere === ""
        ? filteredByTrimestre
        : filteredByTrimestre.filter(
            (note) => note.matiere === selectedMatiere
          );

    setFilteredStudentNotes(filteredByMatiere);
  }, [selectedTrimestre, selectedMatiere, allStudentNotes]);

  const handleChangeTrimestre = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTrimestre(event.target.value);
  };

  const handleChangeMatiere = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMatiere(event.target.value);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <br />
        <h1>Consultation des Notes</h1>
        <br />
        <div className="mb-3">
          <label htmlFor="filterTrimestre">Choisir le trimestre :</label>
          <select
            id="filterTrimestre"
            className="form-select"
            value={selectedTrimestre}
            onChange={handleChangeTrimestre}
          >
            <option value="">Tous les trimestres</option>
            <option value="1">Trimestre 1</option>
            <option value="2">Trimestre 2</option>
            <option value="3">Trimestre 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="filterMatiere">Choisir la matière :</label>
          <select
            id="filterMatiere"
            className="form-select"
            value={selectedMatiere}
            onChange={handleChangeMatiere}
          >
            <option value="">Toutes les matières</option>
            <option value="Mathématiques">Mathématiques</option>
            <option value="Langue Arabe">Langue Arabe</option>
            <option value="Français">Français</option>
            <option value="Anglais">Anglais</option>
            <option value="Histoire-Géographie">Histoire-Géographie</option>
            <option value="Physique-Chimie">Physique-Chimie</option>
            <option value="Sciences de la Vie et de la Terre">
              Sciences de la Vie et de la Terre
            </option>
            <option value="Comptabililé">Comptabililé</option>
            <option value="Economie">Economie</option>
            <option value="Droit">Droit</option>
            <option value="Sciences islamique">Sciences islamique</option>
            <option value="Education islamique">Education islamique</option>
            <option value="Education civile">Education civile</option>
            <option value="Philosophie">Philosophie</option>
            <option value="Espagnol">Espagnol</option>
            <option value="Éducation Physique et Sportive">
              Éducation Physique et Sportive
            </option>
            <option value="Dessin">Dessin</option>
            <option value="Informatique">Informatique</option>
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
