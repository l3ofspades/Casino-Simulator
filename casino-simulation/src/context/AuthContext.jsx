import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);  
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser)); 
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  // Login
const login = ( userData, userToken ) => {
  const safeUser = {
    _id: userData._id,
    username: userData.username,
    email: userData.email,
  };

  setCurrentUser(safeUser);
  setToken(userToken);
  
  localStorage.setItem("token", userToken);
  localStorage.setItem("user", JSON.stringify(safeUser));
}
  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
