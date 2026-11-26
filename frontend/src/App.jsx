import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./Components/Auth/Register.jsx";
import Login from "./Components/Auth/Login.jsx";
import CandidateProfile from "./Components/Candidate/CandidateProfile.jsx";
import UpdateProfile from "./Components/Candidate/UpdateProfile.jsx";
import Home from "./Components/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<CandidateProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}