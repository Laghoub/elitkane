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
  const [studentNotes, setStudentNotes] = useState([] as NoteType[]);
  const matricule = localStorage.getItem("matricule");

  useEffect(() => {
    // Récupérez les notes de l'étudiant depuis l'API en utilisant son matricule
    axios
      .get(`https://elitkane.onrender.com/api/note/${matricule}`)
      .then((response) => {
        setStudentNotes(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des notes de l'étudiant :",
          error
        );
      });
  }, [matricule]);

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <br />
        <h1>Consultation des Notes</h1>
        <br />
        {studentNotes.map((note, index) => (
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
