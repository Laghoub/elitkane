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

const AppRouter: React.FC = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/class"
          element={isLoggedIn ? <Class /> : <Navigate to="/" />}
        />
        <Route
          path="/student"
          element={isLoggedIn ? <Student /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher"
          element={isLoggedIn ? <Teacher /> : <Navigate to="/" />}
        />
        <Route path="/teacherT" element={<Teacher />} />
        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/teacherRegistration" element={<TeacherRegistration />} />
        <Route path="/successRegistration" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
