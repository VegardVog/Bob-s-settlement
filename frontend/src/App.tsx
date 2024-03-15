import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
    <Routes>
    
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>

    </Routes>
    </>
  )
  
  
 
}

export default App;
