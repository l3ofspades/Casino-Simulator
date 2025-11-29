import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    try {
     
      if (savedToken && savedUser && savedUser !== "undefined") {
        setToken(savedToken);
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Clean up any bad data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error restoring user session:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  // Login 
  const login = (userData, userToken) => {
    setCurrentUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

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
