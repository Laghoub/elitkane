import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Class from "./Class";
import Teacher from "./Teacher";
import Student from "./Student";
import StudentRegistration from "./StudentRegistration";
import SuccessPage from "./SuccessPage";
import TeacherRegistration from "./TeacherRegistration";
import UnderDevelopmentPage from "./UnderDevelopmentPage";
import ParentRegistration from "./ParentRegistration";
import Cookies from "js-cookie";

const AppRouter: React.FC = () => {
  const tokenLogin = localStorage.getItem("token");
  const isLogedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/home"
          element={
            Cookies.get("token") ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/class"
          element={tokenLogin ? <Class /> : <Navigate to="/" />}
        />
        <Route
          path="/student"
          element={tokenLogin ? <Student /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher"
          element={tokenLogin ? <Teacher /> : <Navigate to="/" />}
        />

        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/teacherRegistration" element={<TeacherRegistration />} />
        <Route path="/successRegistration" element={<SuccessPage />} />
        <Route path="/parentRegistration" element={<ParentRegistration />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
