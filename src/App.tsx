import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from './views/Register';
import { Home } from "./views/Home";
import { Login } from './views/Login';
import { NavBar } from './components/NavBar';
import { NavbarLayout } from './components/NavbarLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<NavbarLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
