import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { redirect } from "react-router-dom";
import Login from "../Login";

const InfoTeacher = () => {
  type InfoType = {
    nom: string;
    prenom: string;
    matricule: string;
    dateNaissance: string;
    lieuNaissance: string;
    adresse: string;
    matiereEnseignee: string;
    email: string;
  };

  type ClassType = {
    idClasse: string;
  };

  const [teacherList, setTeacherList] = useState([] as InfoType[]);
  const [ClassList, setClassList] = useState([] as ClassType[]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchTeacherList = async (matricule: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/teacher/info/${matricule}`
      );

      if (response.data.success === 1) {
        setTeacherList(response.data.data);
        localStorage.setItem("matiere", teacherList[0].matiereEnseignee);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Teachers:", error);
      setLoading(false);
    }
  };

  const fetchClassList = async (matricule: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/teacher/classteacher/${matricule}`
      );

      if (response.data.success === 1) {
        setClassList(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Teachers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const matricule = localStorage.getItem("matricule");
    const matriculeValue = matricule !== null ? matricule : "";
    fetchTeacherList(matriculeValue);
    fetchClassList(matriculeValue);
  }, []);

  if (!token && localStorage.getItem("role") != "enseignant") {
    return <Login />;
  } else {
    return (
      <div className="container mt-5">
        {loading ? (
          <Typography variant="body2" color="text.secondary">
            Chargement en cours...
          </Typography>
        ) : (
          teacherList.map((teacher, index) => (
            <Card key={index} className="mb-2">
              <CardContent>
                {/* Informations personnelles */}
                <Typography variant="h4" component="div">
                  <span style={{ color: "black" }}>
                    Informations personnelles
                  </span>
                </Typography>
                <br />
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>Matricule:</span>{" "}
                  <span style={{ color: "#2076d3" }}>{teacher.matricule}</span>
                </Typography>
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>Nom:</span>{" "}
                  <span style={{ color: "#2076d3" }}>{teacher.nom}</span>
                </Typography>
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>Prénom:</span>{" "}
                  <span style={{ color: "#2076d3" }}>{teacher.prenom}</span>
                </Typography>
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>
                    Date et lieu de naissance:
                  </span>{" "}
                  <span style={{ color: "#2076d3" }}>
                    {teacher.dateNaissance + " à " + teacher.lieuNaissance}
                  </span>
                </Typography>
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>Matière Enseignée:</span>{" "}
                  <span style={{ color: "#2076d3" }}>
                    {teacher.matiereEnseignee}
                  </span>
                </Typography>
                <Typography variant="h6" component="div">
                  <span style={{ color: "black" }}>Email:</span>{" "}
                  <span style={{ color: "#2076d3" }}>{teacher.email}</span>
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
        {/* Carte pour la liste des classes */}
        <Card className="mb-2">
          <CardContent>
            <Typography variant="h4" component="div">
              <span style={{ color: "black" }}>Liste des Classes</span>
            </Typography>
            <br />
            {ClassList.map((item, index) => (
              <Typography key={index} variant="h6">
                <span style={{ color: "black" }}>Classe {index + 1}:</span>{" "}
                <span style={{ color: "#2076d3" }}>{item.idClasse}</span>
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default InfoTeacher;
