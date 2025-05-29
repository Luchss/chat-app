import { createContext, useState } from "react";

export const AuthContext = createContext(false);

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser]  = useState({});
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser } }>
            {children}
        </AuthContext.Provider>
    );
}