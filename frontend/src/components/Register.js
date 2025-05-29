import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/register", {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            navigate("/login");
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
    }

    return (
        <div className="page-container">
          <div className="form-wrapper">
            <h1 className="page-title">Register</h1>
            <form className="form-inputs" onSubmit={handleSubmit}>
              <input
                className="form-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="form-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="form-btn" type="submit">Register</button>
              <NavLink to="/login" end className="login-instead-btn">Already have an account? Log In here</NavLink>
            </form>
          </div>
        </div>
    );
}
