import React from "react"
import Home from "./components/Home"
import Signup from "./components/signup/Signup"
import Login from "./components/login/Login"
import Dashboard from "./components/Dashboard"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return(
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
