import { Navigate, Route, Routes } from "react-router-dom";
import Alert from "./HomePage";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Alert />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
