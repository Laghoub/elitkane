import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import InfoTeacher from "./infoTeacher";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div>
      <ResponsiveAppBar />;
      <InfoTeacher />
    </div>
  );
};

export default TeacherHomePage;
