import React, { useState, ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./HomePage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "./Mycontext";
import logo from "../assets/logo.png";

const Login = () => {
  const { status, id, name, authorized, unAuthorized, updateId } =
    useMyContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

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
        setLoginSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("name", data.data.nom);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        return true;
      } else {
        setErrorMessage("Les informations de connexion sont incorrectes");
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
    if (localStorage.getItem("role") == "fondatrice") {
      console.log("sucssess");
      navigate("/home");
    } else {
      if (localStorage.getItem("role") == "étudiant") {
        navigate("/successRegistration");
      }
    }
  }

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center login-container"
        style={{ marginTop: "100px" }}
      >
        <div className="col-md-4 login-form-1">
          {/* Logo */}
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="col-md-4 login-form-2">
          {/* Champs de saisie */}
          <h2>Se connecter</h2>
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
          <p>Vous n'avez pas encore un compte ? inscrivez-vous.</p>
          <a href="/teacherRegistration"> Inscription enseignant</a>
          <br />
          <a href="/studentRegistration"> Inscription etudiant</a>
          <br />
          <a href="/student"> Inscription parent</a>
        </div>
      </div>
    </div>
  );
};

export default Login;