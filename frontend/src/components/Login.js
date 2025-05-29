import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { AuthContext } from "../context/AuthContext.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:3001/login", {
            email: email,
            password: password
          })

          if(response.status === 200) {
            setIsLoggedIn(true);
            setUser(response.data.user[0]);
            navigate("/");
          } else {
            setIsLoggedIn(false);
          }
        } catch(err) {
          console.log(err);
          setIsLoggedIn(false);
        } 
    }

    return (
      <div className="login-page">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn" type="submit">Login</button>
            <NavLink to="/register" end className="register-instead-btn">Don`t have an account yet? Sign up here</NavLink>
          </form>
        </div>
      </div>
    );
}