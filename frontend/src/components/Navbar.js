import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import '../styles/Navbar.css';
import { AuthContext } from "../context/AuthContext.js";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <div className="app">
      <nav className="nav" role="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <span className="nav-text">
              {isLoggedIn ? `Welcome back, ${user.username}!` : 'Welcome!'}
            </span>
          </li>
          <li className="nav-item nav-center">
            <NavLink to="/" end>Chat</NavLink>
          </li>

          {isLoggedIn ? (
            <li className="nav-item">
              <NavLink to="/profile" end className="nav-link">
                <img 
                  src="/images/default.png" 
                  alt="Profile" 
                  className="profile"
                />
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <div className="auth">
                <NavLink to="/login" end className="auth-item">Login</NavLink>
                <NavLink to="/register" end className="auth-item">Register</NavLink>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;