import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import UserAvatar from "./UserAvatar";
import { Menu, MenuItem } from "@material-ui/core";
import ProjectForm from "../Forms/ProjectForm";
import TaskForm from "../Forms/AddTaskForm";
import Search from "../../assets/search";
import messageIcon from "../../assets/message.png";
import Alert from "../../assets/alert";
import { logout } from "../../redux/actions/authActions";

const TopNavBar = ({ name, setTeamProjects, setTasklists, sidebar }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openProject, setOpenProject] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const clickOpenTask = () => {
    setOpenTask(true);
    handleNewClose();
  };

  const clickCloseTask = () => {
    setOpenTask(false);
  };

  const clickOpenProject = () => {
    setOpenProject(true);
    handleNewClose();
  };
  const clickCloseProject = () => {
    setOpenProject(false);
  };

  const handleNewClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNewClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // <div
    //   className={
    //     sidebar ? "top-nav-bar-container__short" : "top-nav-bar-container"
    //   }
    // >
    <div className="top-nav-bar-container">
      <div className="top-nav-bar-left">
        <h2>{name}</h2>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        {/* <div style={{ display: "flex" }}>
          <input className="searchbar" placeholder={"Search"}></input>
        </div> */}
        {/* <div>
          <GrAddCircle onClick={handleNewClick} className="top-nav-bar--icon" />
          <Menu
            style={{ marginTop: "40px" }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleNewClose}
          >
            <MenuItem onClick={clickOpenTask}>Add Task</MenuItem>
            <TaskForm
              handleNewClose={handleNewClose}
              clickClose={clickCloseTask}
              open={openTask}
              setTasklists={setTasklists}
            ></TaskForm>
            <MenuItem onClick={clickOpenProject}>Add Project</MenuItem>
            <ProjectForm
              handleNewClose={handleNewClose}
              clickClose={clickCloseProject}
              open={openProject}
              setTeamProjects={setTeamProjects}
            />
          </Menu>
        </div> */}
        <div
          className="top-nav-icons"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <Alert />
          </div>
          <div>
            <Search />
          </div>

          <div>
            <img className="logo" style={{}} src={messageIcon} alt="logo" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "0" }}>
            <UserAvatar id={localStorage.getItem("userId")} />
          </div>
          <div>{userState.user.name}</div>
          <div
            onClick={handleProfClick}
            style={{ padding: "0", cursor: "pointer" }}
          >
            <i className="arrow"></i>
          </div>
        </div>

        <Menu
          style={{ marginTop: "40px" }}
          anchorEl={anchorEle}
          keepMounted
          open={Boolean(anchorEle)}
          onClose={handleProfClose}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TopNavBar;