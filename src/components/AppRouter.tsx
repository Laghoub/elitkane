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
import TeacherHomePage from "./Teacher/TeacherHomePage";
import StudentHomePage from "./Student/StudentHomePage";
import Myclass from "./Teacher/Myclass";
import Notes from "./Teacher/Notes";
import StudentNotes from "./Student/StudentNotes";

const AppRouter: React.FC = () => {
  const tokenLogin = Cookies.get("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            tokenLogin ? (
              role === "fondatrice" ? (
                <HomePage />
              ) : role === "étudiant" ? (
                <StudentHomePage />
              ) : (
                <TeacherHomePage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/classteacher" element={<Myclass />} />
        <Route path="/teacherhome" element={<TeacherHomePage />} />
        <Route path="/studenthome" element={<StudentHomePage />} />
        <Route path="/setnotes" element={<Notes />} />
        <Route path="/getnotes" element={<StudentNotes />} />

        <Route
          path="/class"
          element={
            tokenLogin && role === "fondatrice" ? (
              <Class />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/student"
          element={
            tokenLogin && role === "fondatrice" ? (
              <Student />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/teacher"
          element={
            tokenLogin && role === "fondatrice" ? (
              <Teacher />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/teacherRegistration" element={<TeacherRegistration />} />
        <Route path="/successRegistration" element={<SuccessPage />} />
        <Route path="/parentRegistration" element={<ParentRegistration />} />
        <Route path="/underdev" element={<UnderDevelopmentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
