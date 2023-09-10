import AppRouter from "./components/AppRouter";
import { MyContextProvider } from "./components/Mycontext";
import Login from "./components/Login";
import Alert from "./components/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Message from "./Message";
const App = () => {
  return (
    <MyContextProvider>
      <AppRouter />
    </MyContextProvider>
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
