import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import students from "../assets/students.jpeg";
import classes from "../assets/classes.jpeg";
import teacher from "../assets/teacher.jpeg";
import edt from "../assets/edt.jpeg";
import profile from "../assets/profile.png";
import Cookies from "js-cookie";
import Login from "./Login";
interface props {
  children: ReactNode;
}

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token && localStorage.getItem("role") != "Fondateur") {
    return <Login />;
  } else {
    return (
      <div className="container home-container" style={{ marginTop: "60px" }}>
        <div className="col-md-12">
          {/* Carte du profil de l'utilisateur */}
          <div
            className="card profile-card"
            style={{ backgroundColor: "#022634" }}
          >
            <div className="row no-gutters">
              <div className="col-md-2">
                {/* Image de l'utilisateur */}
                <img
                  src={profile}
                  alt="classes"
                  className="classes"
                  style={{ width: "100px", height: "100px", margin: "1rem" }}
                />
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  {/* Informations de l'utilisateur */}
                  <h5 className="card-title" style={{ color: "#e3f2fd" }}>
                    Bienvenue {name}{" "}
                  </h5>
                  <p className="card-text" style={{ color: "#e3f2fd" }}>
                    Vous êtes connectés en tant que {role} de l'école privée el
                    Itkane el Ilmi
                  </p>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <center>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={classes}
                  alt="classes"
                  className="classes"
                  style={{ width: "280px", height: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Gestion des classes</h5>
                  <p className="card-text">
                    Vous pouvez ici gérer le système de création des classes.
                  </p>
                  <Link to="/class">Gérer</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              {/* Carte de gestion des classes */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={students}
                  alt="Logo"
                  className="logo"
                  style={{ width: "280px", height: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Gestion des étudiants</h5>
                  <p className="card-text">
                    Vous pouvez ici gérer l'inscription, les comptes des
                    étudiants
                  </p>
                  <Link to="/student">Gérer</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              {/* Carte de gestion des classes */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={teacher}
                  alt="Logo"
                  className="logo"
                  style={{ width: "280px", height: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Gestion des enseignants</h5>
                  <p className="card-text">
                    Vous pouvez ici gérer le système de création des
                    enseignants,
                  </p>
                  <Link to="/teacher">Gérer</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              {/* Carte de gestion des classes */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={edt}
                  alt="Logo"
                  className="logo"
                  style={{ width: "250px", height: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Gestion des EDT </h5>
                  <p className="card-text">
                    Vous pouvez ici gérer le emplois du temps de tous les
                    cycles.
                  </p>
                  <Link to="/teacher">Gérer</Link>
                </div>
              </div>
            </div>
          </div>
        </center>
        <br />
        <br />
      </div>
    );
  }
};

export default HomePage;
