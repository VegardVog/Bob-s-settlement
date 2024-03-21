import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/Menu";
import Profile from "./components/profile/Profile";
import Settlements from "./components/settlements/Settlements";
import SettlementPage from "./pages/SettlementPage";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settlements" element={<Settlements />} />
        <Route path="/settlement/:id" element={<SettlementPage />} />
      </Routes>
    </>
  );
}

export default App;
