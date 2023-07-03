import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./Pages/Home";
import TasksPage from "./Pages/Tasks";
import ProjectPage from "./Pages/Project";
import ProjectsPage from "./Pages/Projects";
import NewProjectPage from "./Pages/NewProject";
import TeamPage from "./Pages/Team";
import NewTasksPage from "./Pages/NewTasks";
import "../css/Navbar.css";
import LeftNavBar from "./NavigationBar/LeftNavBar";
import { getUserInfo } from "../redux/actions/UserActions";
import { getUserTasks } from "../redux/actions/TaskActions";
import { getUserTeams } from "../redux/actions/TeamActions";
import { getUserProjects } from "../redux/actions/ProjectActions";

const AuthRoutes = () => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getUserTasks(userId));
    dispatch(getUserTeams(userId));
    dispatch(getUserProjects(userId));
  }, [dispatch, userId]);

  return (
    <div className="overlay">
      <BrowserRouter>
        <LeftNavBar showSidebar={showSidebar} sidebar={sidebar} />
        <div
          className={
            sidebar
              ? "overlay-right-container"
              : "overlay-right-container__short"
          }
        >
          <Routes>
            <Route exact path="/homepage" element={<HomePage />} />
            <Route exact path="/tasks" element={<NewTasksPage />} />
            <Route exact path="/projects" element={<ProjectsPage />} />
            <Route
              path="/teams/:teamId/project/:projectId/:projectName"
              render={() => <ProjectPage sidebar={sidebar} />}
            />
            <Route path="/teams/:teamId/:name" element={<TeamPage />} />
            <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AuthRoutes;
