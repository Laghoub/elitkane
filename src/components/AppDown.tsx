import React from "react";

const ErrorMessage: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <h1>Site Temporairement Inaccessible</h1>
      <p>Merci de contacter le propriétaire du site.</p>
    </div>
  </div>
);

const AppDown: React.FC = () => {
  const isSiteInaccessible = true; // Remplacez ceci par votre logique pour vérifier l'inaccessibilité

  return (
    <div>
      {isSiteInaccessible ? (
        <ErrorMessage />
      ) : (
        <div>Contenu normal de votre site</div>
      )}
    </div>
  );
};

export default AppDown;
