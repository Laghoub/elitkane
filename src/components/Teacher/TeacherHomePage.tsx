import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import InfoTeacher from "./infoTeacher";
import Typography from "@mui/material/Typography";

const TeacherHomePage = () => {
  return (
    <div>
      <ResponsiveAppBar />;
      <Typography variant="h6" component="div">
        <span style={{ color: "black" }}>Bienvenue !</span>{" "}
      </Typography>
      <InfoTeacher />
    </div>
  );
};

export default TeacherHomePage;
