import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import RegistrationPage from "./pages/RegistrationPage";
import SinglePost from "./pages/SinglePost";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditProfile from "./pages/EditProfile";

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
        <Route
          path="/post/:postId/"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/edit/"
          element={
            <ProtectedRoute>
              <EditProfile />
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
