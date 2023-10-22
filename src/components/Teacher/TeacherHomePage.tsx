import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import InfoTeacher from "./infoTeacher";
import Typography from "@mui/material/Typography";

const TeacherHomePage = () => {
  return (
    <div>
      <ResponsiveAppBar />;
      <InfoTeacher />
    </div>
  );
};

export default TeacherHomePage;
