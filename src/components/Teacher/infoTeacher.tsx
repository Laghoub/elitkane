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
  };
  const [matricule, setMatricule] = useState("");
  const [TeacherInfo, setTeacherInfo] = useState([] as InfoType[]);

  const infoTeacher = async (matricule: string) => {
    setMatricule("2324879520");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/teacher/info/${matricule}`
      );

      if (response.data.success === 1) {
        console.log(response.data.data);
        setTeacherInfo(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Teachers:", error);
    }
  };

  useEffect(() => {
    infoTeacher(matricule);
  }, []);

  return (
    <div className="container mt-5">
      <Card>
        <CardContent>
          {TeacherInfo ? (
            <div>
              <Typography variant="h5" component="div">
                Nom: {TeacherInfo[0].nom}
              </Typography>
              <Typography variant="h6" component="div">
                Prénom: {TeacherInfo[0].prenom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Matricule: {TeacherInfo[0].matricule}
              </Typography>
              {/* Ajoutez d'autres informations ici */}
            </div>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Chargement en cours...
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoTeacher;
