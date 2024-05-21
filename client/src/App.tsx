import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login/" index element={<LoginPage />} />
        <Route path="/register/" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
