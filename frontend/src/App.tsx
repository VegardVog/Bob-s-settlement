import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Menu from "./components/Menu";

function App() {
  return (
    <>
     <Menu />
    <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Dashboard />}/>

    </Routes>
    </>
  )
  
  
 
}

export default App;
