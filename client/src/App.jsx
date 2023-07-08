import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import "./css/Home.css";
import RegisterPage from "./components/LandingPage/RegisterPage";
import Onboard from "./components/LandingPage/Onboard";
import LoginPage from "./components/LandingPage/LoginPage";


const App = () => {
  // State variables for user-related data
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  
  // // autologin
  // useEffect(() => {
  //   fetch(`http://localhost:3000/me`, {
  //     credentials: "include",
  //     mode: "cors",
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((user) => {
  //         localStorage.setItem("user", user);
  //         setUser(user);
  //       });
  //     }
  //   });

  //   const userData = localStorage.getItem("user");
  //   if (userData) {
  //     const foundUser = JSON.parse(userData);
  //     //   console.log(foundUser)
  //     setUser(foundUser);
  //   }
  // }, [])

  // State variables for sidebar and its visibility
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  // Logout function
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setEmail(null);
    setUserId(null);
  };
 
  // JSX rendering of the application
  return (
    <div className="App">
    <LoginPage />
    </div>
  );
};

export default App;
