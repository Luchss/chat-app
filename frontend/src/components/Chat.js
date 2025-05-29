import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../context/AuthContext.js';
import "../styles/Chat.css";

export default function Chat() {
    const [message, setMessage] = useState("");
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        function connectWebSocket() {
            if (socketRef.current) {
                socketRef.current.close();
            }
            socketRef.current = new WebSocket("ws://localhost:3001");

            socketRef.current.onopen = () => {
                socketRef.current.send(JSON.stringify({
                    type: "setUsername",
                    username: isLoggedIn && user.username ? user.username : "Guest" 
                }));

                socketRef.current.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === "messageHistory") {
                        setChatMessages(data.messages);
                        console.log(data);
                    } 
                    if (data.type === "chatMessage") {
                        setChatMessages(prev => [...prev, {
                            username: data.username,
                            message: data.message,
                            timestamp: data.timestamp
                        }]);
                    }
                };
            };

            socketRef.current.onclose = (event) => {
                console.log("Verbindung geschlossen:", event);
            };

            socketRef.current.onerror = (error) => {
                console.error("WebSocket-Fehler:", error);
            };

        }

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
        }, [isLoggedIn, user.username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [chatMessages]);

    function handleSubmit(e) {
        e.preventDefault();
        if (message !== "") {
            if (isLoggedIn && user && user.username) {
                socketRef.current.send(JSON.stringify({
                    type: "chatMessage",
                    message: message
                }));
                setMessage("");
            }
        }
    }


    return (
        <div className="chat-card">
            <div className="messages-container">
                {chatMessages.map((e, index) => {
                    return (
                        <div className="message-container" key={`${e.timestamp}-${index}`}>
                            <h2 className="username">{e.username}</h2>
                            <p className="message">{e.message}</p>
                            <time className="timestamp">{e.timestamp}</time>
                        </div>
                        )
                    })}
                <div ref={messagesEndRef} />
            </div>
            {isLoggedIn ? (
                <form className="chat-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter Chat Message!" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="chat-input"
                />
                <button className="submit-btn" type="submit">Send</button>
                </form>
            ) : (
                <h2>Login to Chat!</h2>
            )}
        </div>
    );
}