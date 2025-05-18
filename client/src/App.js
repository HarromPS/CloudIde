import React from 'react';
import Home from './components/home/Home';
import Dashboard from './components/home/dashboard/Dashboard';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import Templates from "./components/home/dashboard/Templates";
import Workshop from "./components/home/dashboard/Workshop";
import CodeEditor from "./components/home/dashboard/CodeEditor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="templates" element={<Templates />} />
          <Route path="workshop" element={<Workshop />} />
        </Route>
        <Route path="code_editor" element={<CodeEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
