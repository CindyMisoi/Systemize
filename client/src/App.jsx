import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import AuthContext from "./context/AuthContext";
import UserStore from "./context/store/UserStore";
import TeamStore from "./context/store/TeamStore";
import TaskStore from "./context/store/TaskStore";
import ProjectStore from "./context/store/ProjectStore";
import TasklistStore from "./context/store/TasklistStore";
import "./css/Home.css";


const App = () => {
  // State variables for user-related data
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);

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
  
  // Context object containing user-related data, as well as related functions
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

  // JSX rendering of the application
  return (
    <AuthContext.Provider value={context}>
      <UserStore>
        <ProjectStore>
          <TeamStore>
            <TasklistStore>
              <TaskStore>
                <Routes />
              </TaskStore>
            </TasklistStore>
          </TeamStore>
        </ProjectStore>
      </UserStore>
    </AuthContext.Provider>
  );
};

export default App;
