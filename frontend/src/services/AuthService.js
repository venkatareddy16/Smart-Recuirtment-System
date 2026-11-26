import API from "./api";

const AuthService = {
  // POST /api/auth/register
  register: (userData) => {
    return API.post("/auth/register", userData);
  },

  // POST /api/auth/login
  login: (credentials) => {
    return API.post("/auth/login", credentials);
  },

  saveToken: (token) => {
    localStorage.setItem("token", token);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },

  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  },
};

export default AuthService;
