import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../components/authentication/LoginForm";
import { UserRegister } from "../components/authentication/RegistrationForm";

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api";

  return {
    login,
    register,
    logout,
  };

  // Login the user
  async function login(data: UserLogin) {
    const res = await axios.post(`${baseURL}/auth/login/`, data);
    // Registering the account and tokens in the store
    setUserData(res.data);
    navigate("/");
  }

  // Register the user
  async function register(data: UserRegister) {
    const res = await axios.post(`${baseURL}/auth/register/`, data);
    // Registering the account and tokens in the store
    setUserData(res.data);
    navigate("/");
  }

  // Logout the user
  function logout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export { useUserActions, getUser, getAccessToken, getRefreshToken };
