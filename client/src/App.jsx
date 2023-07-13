import React, { useState } from "react";
import Routes from "./components/Routes";
import { AuthProvider } from "./context/AuthContext";
import UserStore from "./context/store/UserStore";
import TeamStore from "./context/store/TeamStore";
import TaskStore from "./context/store/TaskStore";
import ProjectStore from "./context/store/ProjectStore";
import TasklistStore from "./context/store/TasklistStore";
import "./css/Home.css";

const App = () => {
  return (
    <AuthProvider> {/* Wrap the AuthProvider around the components */}
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
    </AuthProvider>
  );
};

export default App;
