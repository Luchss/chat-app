import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from './components/Register.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import AuthProvider from './context/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>

        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

