import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

const InfoStudent = () => {
  type InfoType = {
    nom: string;
    prenom: string;
    matricule: string;
    dateNaissance: string;
    lieuNaissance: string;
    classe: string;
    filiere: string;
    email: string;
  };

  const [studentList, setStudentList] = useState([] as InfoType[]);
  const [loading, setLoading] = useState(true);

  const fetchStudentList = async (matricule: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/student/info/${matricule}`
      );

      if (response.data.success === 1) {
        setStudentList(response.data.data);
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
    fetchStudentList(matriculeValue);
  }, []);

  return (
    <div className="container mt-5">
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Chargement en cours...
        </Typography>
      ) : (
        studentList.map((student, index) => (
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
                <span style={{ color: "#2076d3" }}>{student.matricule}</span>
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color: "black" }}>Nom:</span>{" "}
                <span style={{ color: "#2076d3" }}>{student.nom}</span>
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color: "black" }}>Prénom:</span>{" "}
                <span style={{ color: "#2076d3" }}>{student.prenom}</span>
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color: "black" }}>
                  Date et lieu de naissance:
                </span>{" "}
                <span style={{ color: "#2076d3" }}>
                  {student.dateNaissance + " à " + student.lieuNaissance}
                </span>
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color: "black" }}>classe</span>{" "}
                <span style={{ color: "#2076d3" }}>
                  {student.classe + " " + student.filiere}
                </span>
              </Typography>
              <Typography variant="h6" component="div">
                <span style={{ color: "black" }}>Email:</span>{" "}
                <span style={{ color: "#2076d3" }}>{student.email}</span>
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      {/* Carte pour la liste des classes */}
    </div>
  );
};

export default InfoStudent;
