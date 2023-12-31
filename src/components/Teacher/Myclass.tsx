import ResponsiveAppBar from "./ResponsiveAppBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Modal, Form, Button, Row, Col, Toast } from "react-bootstrap";

const Myclass = () => {
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
    nomUser: string;
    mdp: string;
  };
  const [classes, setClasses] = useState([] as ClassType[]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([] as studentType[]);
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

  const handleValider = () => {
    // Lorsque l'enseignant clique sur le bouton "Valider",
    // récupérez la liste des étudiants pour la classe sélectionnée

    axios
      .get(`https://elitkane.onrender.com/api/student/class/${selectedClass}`)
      .then((response) => {
        setStudents(response.data.data);
        console.log("entrer");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement des étudiants :", error);
      });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <h1>Tableau de bord de l'enseignant</h1>
        <br />
        <h2>Mes étudiants</h2>
        <br />
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="selectedClass">
              <Form.Control
                as="select"
                name="selectedClass"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                <option value="" disabled>
                  Classe
                </option>
                {classes.map((classe) => (
                  <option key={classe.idClasse} value={classe.idClasse}>
                    {classe.idClasse}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <br />
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={handleValider}>
              Valider
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Date de naissance</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any) => (
                  <tr key={student.matricule}>
                    <td>{student.nom}</td>
                    <td>{student.prenom}</td>
                    <td>{student.dateNaissance.substring(0, 10)}</td>
                    <td>{student.mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myclass;
