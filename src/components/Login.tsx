import React, { useState, ReactNode, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./HomePage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const date = new Date();
  const [accessData, setAccessData] = useState({
    dateaccess: date.toDateString,
  });

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://elitkane.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            mdp: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success === 1) {
        Cookies.set("token", data.token, { expires: 30 });
        setLoginSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("matricule", data.data.matricule);
        localStorage.setItem("name", data.data.nom);
        localStorage.setItem("role", data.data.role);
        //localStorage.setItem("token", data.token);
        //setToken(data.token);
        return true;
      } else {
        setErrorMessage(
          "Vous avez effectué l'inscription, mais votre compte n'a pas encore été validé. Vous pourrez accéder à votre compte à partir du 23 octobre."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  if (loginSuccess) {
    navigate("/");
  }

  const access = async (e: any) => {
    try {
      const response = await axios.post(
        "https://elitkane.onrender.com/api/access",
        accessData
      );
      console.log("date added:", response.data);

      // Réinitialiser les champs après l'insertion
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    access;
  });

  return (
    <div>
      <div className="container" style={{ background: "#022634" }}>
        <div
          className="row justify-content-center align-items-center login-container"
          style={{ marginTop: "100px", padding: "40px" }}
        >
          <div className="col-md-4 login-form-1">
            {/* Logo */}
            <center>
              <img src={logo} alt="Logo" className="logo" />
            </center>
            <b>
              <p style={{ color: "white" }}>
                Plateforme web développée par: LAGHOUB Nassim
                <p>elitkane.web@gmail.com | Touts droits réservés</p>
              </p>
            </b>
          </div>

          <div className="col-md-4 login-form-2">
            {/* Champs de saisie */}
            <h2 style={{ color: "white" }}>Se connecter</h2>
            <br />
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nom d'utilisateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Se connecter
              </button>
            </div>
            <br />
            <p style={{ color: "white" }}>
              Vous n'avez pas encore un compte ? inscrivez-vous.
            </p>
            <Link to="/teacherRegistration" style={{ color: "white" }}>
              Inscription enseignant
            </Link>
            <br />
            <Link to="/studentRegistration" style={{ color: "white" }}>
              Inscription étudiant
            </Link>
            <br />
            <Link to="/parentRegistration" style={{ color: "white" }}>
              Inscription parent
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Login;
