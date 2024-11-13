import React from 'react';
import Home from './components/home/Home';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
