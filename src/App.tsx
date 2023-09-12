import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Class from "./components/Class";
import Teacher from "./components/Teacher";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";

import Student from "./components/Student";
import StudentRegistration from "./components/StudentRegistration";
import SuccessPage from "./components/SuccessPage";
import TeacherRegistration from "./components/TeacherRegistration";

const App: React.FC = () => {
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

export default App;
