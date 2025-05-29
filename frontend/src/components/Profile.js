import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import '../styles/Profile.css';
import axios from 'axios';

export default function Profile() {
    const [editingField, setEditingField] = useState(null);
    const [ newValue, setNewValue ] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleChange(field) {
        try {
            if (newValue !== "") {
                const response = await axios.put("http://localhost:3001/profile/update", {
                    id: user.id,
                    field: field,
                    value: newValue
                });
                setUser(response.data.user);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setEditingField(null);
            setNewValue("");
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="profile-page">
                {isLoggedIn && user ? (
                    <div className="profile-box">
                        <h1 className="profile-title">Profile</h1>
                        <div className="profile-info-group">
                            <h2 className="profile-label">Username</h2>
                            {editingField === "username" ? (                        
                                <div className="input-group">
                                    <input 
                                        className="input-field"
                                        placeholder="New Username" 
                                        value={newValue} 
                                        type="text"
                                        onChange={(e) => setNewValue(e.target.value)}></input>
                                    <button className="profile-button" onClick={async () => {
                                        try {
                                            const response = await axios.put("http://localhost:3001/profile/update", {
                                                id: user.id,
                                                field: "username",
                                                value: newValue
                                            });
                                            setUser(response.data.user);
                                        } catch (err) {
                                            console.log(err);
                                        }
                                        setEditingField(null);}}>Change</button>
                                    <button className="profile-button" onClick={() => {
                                        setEditingField(null);}}>Cancel</button>
                                </div> 
                            ) : (
                                <div>
                                    <p className="profile-value">{user.username}</p>
                                    <button className="profile-button" onClick={() => {
                                        setEditingField("username");
                                        }}>Change</button>
                                </div>
                            )}
                        </div>
                        
                        {editingField === "email" ? (
                            <div className="input-group">
                                <input 
                                    className="input-field"
                                    placeholder="New Email" 
                                    value={newValue} 
                                    type="email"
                                    onChange={(e) => setNewValue(e.target.value)}></input>
                                <button className="profile-button" onClick={() => handleChange("email")}>Change</button>
                                <button className="profile-button" onClick={() => {
                                        setEditingField(null);
                                        }}>Cancel</button>
                            </div>
                        ) : (
                            <div className="profile-info-group">
                                <h2 className="profile-label">Email</h2>
                                <p className="profile-value">{user.email.replace(/(.{2}).+(@.+)/, "$1***$2")}</p>
                                <button className="profile-button" onClick={() => {
                                        setEditingField("email");
                                        }}>Change</button>
                            </div>
                        )}

                        {editingField === "password" ? (
                            <div className="input-group">
                                <input 
                                    className="input-field"
                                    placeholder="New Password" 
                                    value={newValue} 
                                    type="password"
                                    onChange={(e) => setNewValue(e.target.value)}></input>
                                <button className="profile-button" onClick={() => handleChange("password")}>Change</button>
                                <button className="profile-button" onClick={() => {
                                        setEditingField(null);
                                        }}>Cancel</button>
                            </div>
                        ) : (
                            <div className="profile-info-group">
                                <h2 className="profile-label">Password</h2>
                                <p className="profile-value">**********</p>
                                <button className="profile-button" onClick={() => {
                                    setEditingField("password");
                                    }}>Change</button>
                            </div>
                        )}

                        <button className="logout-btn" onClick={() => {
                            setIsLoggedIn(false);
                            setUser({});
                            navigate("/");
                        }}>Logout</button>
                    </div>
                ) : (
                    <NavLink to="/login" className="nav-link">Login to view Settings</NavLink>
                )}
            </div>
        </div>
    );
}