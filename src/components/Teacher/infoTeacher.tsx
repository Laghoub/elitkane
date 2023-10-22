import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

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

  const [teacherList, setTeacherList] = useState([] as InfoType[]);
  const [loading, setLoading] = useState(true);

  const fetchTeacherList = async (matricule: string) => {
    try {
      const response = await axios.get(
        `https://elitkane.onrender.com/api/teacher/info/${matricule}`
      );

      if (response.data.success === 1) {
        setTeacherList(response.data.data);
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
  }, []);

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
                <span style={{ color: "black" }}>Date de naissance:</span>{" "}
                <span style={{ color: "#2076d3" }}>
                  {teacher.dateNaissance}
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
    </div>
  );
};

export default InfoTeacher;
