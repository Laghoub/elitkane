import Login from "./Login";
import HomePage from "./HomePage";
import Class from "./Class";
import Teacher from "./Teacher";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import { useMyContext } from "./Mycontext";
import Student from "./Student";
import StudentRegistration from "./StudentRegistration";
import SuccessPage from "./SuccessPage";
import TeacherRegistration from "./TeacherRegistration";

const AppRouter: React.FC = () => {
  const isLoggedIn = localStorage.getItem("token");
  const { status, authorized, unAuthorized, updateId } = useMyContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/class"
          element={isLoggedIn ? <Class /> : <Navigate to="/login" />}
        />

        <Route
          path="/student"
          element={isLoggedIn ? <Student /> : <Navigate to="/login" />}
        />

        <Route
          path="/teacher"
          element={isLoggedIn ? <Teacher /> : <Navigate to="/login" />}
        />

        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/teacherRegistration" element={<TeacherRegistration />} />
        <Route path="/successRegistration" element={<SuccessPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
