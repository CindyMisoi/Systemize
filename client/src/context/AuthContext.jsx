import React, { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(sessionStorage.getItem("session_token") || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
  const [email, setEmail] = useState(sessionStorage.getItem("email") || null);
  const [user, setUser] = useState(sessionStorage.getItem("user") || null);

  
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const logout = () => {
    sessionStorage.removeItem("session_token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user");
    setAuth(null); // Set the token value to an empty string
    setEmail(null);
    setUserId(null);
  };

  const context = {
    auth,
    setAuth,
    userId,
    setUserId,
    email,
    setEmail,
    user,
    setUser,
    sidebar,
    setSidebar,
    showSidebar,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};
