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

  const [teacherList, setTeacherList] = useState([] as InfoType[]);
  const [loading, setLoading] = useState(true);

  const fetchTeacherList = async () => {
    try {
      const response = await axios.get(
        "https://elitkane.onrender.com/api/teacher/info/2324879520"
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
    fetchTeacherList();
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
              <Typography variant="h5" component="div">
                Nom: {teacher.nom}
              </Typography>
              <Typography variant="h6" component="div">
                Prénom: {teacher.prenom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Matricule: {teacher.matricule}
              </Typography>
              {/* Ajoutez d'autres informations ici */}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default InfoTeacher;
