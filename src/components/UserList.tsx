import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/users/")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          setUsers(data.data);
        } else {
          setError("Une erreur s'est produite lors de la requête.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors de la requête : " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user}>
              <strong>Nom:</strong> {user}, <strong>Email:</strong> {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
