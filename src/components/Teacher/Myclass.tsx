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

const Myclass = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const matricule = localStorage.getItem("matricule");

  useEffect(() => {
    // Récupérez la liste des classes de l'enseignant à partir de l'API
    axios
      .get(
        `https://elitkane.onrender.com/api/teacher/classteacher/${matricule}`
      )
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement des classes :", error);
      });
  }, []);

  const handleClassChange = (event: any) => {
    const selectedClassId = event.target.value as string;
    setSelectedClass(selectedClassId);

    // Récupérez la liste des étudiants pour la classe sélectionnée
    axios
      .get(`https://elitkane.onrender.com/api/student/class/${selectedClassId}`)
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement des étudiants :", error);
      });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <h1>Tableau de bord de l'enseignant</h1>
      <FormControl>
        <InputLabel>Choisir une classe</InputLabel>
        <Select value={selectedClass} onChange={handleClassChange}>
          {classes.map((classe: any) => (
            <MenuItem key={classe.idClasse} value={classe.idClasse}>
              {classe.idClasse}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell>{student.nom}</TableCell>
                <TableCell>{student.prenom}</TableCell>
                <TableCell>{student.dateNaissance}</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Myclass;
