import AppRouter from "./components/AppRouter";
import Login from "./components/Login";
import Alert from "./components/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Message from "./Message";
import { useState, ReactNode, useEffect } from "react";
const App: React.FC = () => {
  return (
    <AppRouter />

    /*
    <Routes>
      <Route path="/home" element={<Alert />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    */
  );
};
export default App;
