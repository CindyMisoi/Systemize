import React, { createContext, useState, useEffect } from "react";
import apiServer from "../config/apiServer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await apiServer.get("/me");
      if (res.data.authenticated) {
        setAuth(true);
        setEmail(res.data.email);
        setUserId(res.data.userId);
      } else {
        setAuth(false);
        setEmail("");
        setUserId("");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, email, setEmail, userId, setUserId, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext

