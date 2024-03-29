import React, { useState, ReactNode, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./HomePage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import itkan from "../assets/logo itkan.png";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const date = new Date();
  const [accessData, setAccessData] = useState({
    dateaccess: date.toDateString,
  });

  const handleLogin = async () => {
    setLoading(true);
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
        if (data.data.role == "Fondateur") {
          console.log("sucssess");
          navigate("/");
        } else {
          if (data.data.role == "étudiant") {
            navigate("/studenthome");
          } else {
            navigate("/teacherhome");
          }
        }
        //localStorage.setItem("token", data.token);
        //setToken(data.token);

        return true;
      } else {
        setLoading(false);
        setErrorMessage(
          "Les informations de connexion sont incorrectes ou votre compte n'est pas encore validé !"
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
      <div className="container" style={{ background: "white" }}>
        <div
          className="row justify-content-center align-items-center login-container"
          style={{ marginTop: "100px", padding: "40px" }}
        >
          <div className="col-md-4 login-form-1">
            {/* Logo */}
            <center>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  className="logo"
                  style={{ width: "150px", marginRight: "10px" }}
                />
                <img
                  src={itkan}
                  alt="Logo"
                  className="logo"
                  style={{ width: "150px" }}
                />
              </div>
            </center>
            <b>
              <p style={{ color: "#022634" }}>
                Plateforme web développée par: LAGHOUB Nassim
                <p>elitkane.web@gmail.com | Tous droits réservés</p>
              </p>
            </b>
          </div>

          <div className="col-md-4 login-form-2">
            {/* Champs de saisie */}
            <h2 style={{ color: "#022634" }}>Se connecter</h2>
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
              <Modal
                show={loading}
                onHide={() => setLoading(false)}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Merci de patienter...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Le processus de connexion est en cours. Veuillez patienter.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setLoading(false)}>
                    Annuler
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <br />
            <p style={{ color: "#022634" }}>
              Vous n'avez pas encore un compte ? inscrivez-vous.
            </p>
            <Link to="/teacherRegistration" style={{ color: "#022634" }}>
              Inscription enseignant
            </Link>
            <br />
            <Link to="/studentRegistration" style={{ color: "#022634" }}>
              Inscription étudiant
            </Link>
            <br />
            <Link to="/parentRegistration" style={{ color: "#022634" }}>
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
