import React from "react";

import InfoStudent from "./infoStudent";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Student/ResponsiveAppBar";

const StudentHomePage = () => {
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
      <InfoStudent />
    </div>
  );
};

export default StudentHomePage;
