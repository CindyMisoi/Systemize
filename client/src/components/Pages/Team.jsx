import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavBar from "../NavigationBar/TopNavBar";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import "../../css/TeamPage.css";
import { Menu, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  // getTeam,
  // updateTeamDescription,
  // leaveTeam,
} from "../../redux/actions/TeamActions";

import TeamMemberIcon from "../teams/TeamMemberIcon";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import NewTeamMemberIcon from "../teams/NewTeamMemberIcon";
import AddProjectPopOut from "../PopOutMenu/AddProjectPopOut";
import { AiOutlineEllipsis } from "react-icons/ai";

const TeamPage = () => {
  const { teamId, name } = useParams();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [sideProjectForm, setSideProjectForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const team = useSelector((state) => state.team.team);
  const teamProjects = useSelector((state) => state.team.teamProjects);
  const teamUsers = useSelector((state) => state.team.teamUsers);
  const loading = useSelector((state) => state.team.loading);

  const showSideProjectForm = () => {
    setSideProjectForm(!sideProjectForm);
  };

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleUpdate = (e) => {
    const description = e.target.value;
    dispatch(updateTeamDescription(teamId, description));
  };

  useEffect(() => {
    dispatch(getTeam(teamId));
  }, [dispatch, teamId]);

  if (loading) {
    return <Loader />;
  }

  const updateDescription = async (e) => {
    const description = e.target.value;
    await apiServer.put(`/teams/${teamId}/description`, { description });
    console.log(e.target.value);
  };

  const handleLeaveTeam = async () => {
    dispatch(leaveTeam(teamId));
    navigate("/");
  };
  return (
    <>
      <TopNavBar name={name} setTeamProjects={setTeamProjects} />
      <div className="team-page-container">
        <div className="team-page-content-container">
          <div className="team-page-content-left">
            <div className="team-content-left-description-container">
              <div className="team-content-left-description-header">
                <div className="team-content-title">Description</div>
              </div>
              <form className="team-content-left-description-form">
                <textarea
                  className="edit-description"
                  placeholder="Click to add team description..."
                  value={teamDescription}
                  onChange={handleUpdate}
                  onBlur={updateDescription}
                ></textarea>
              </form>
            </div>
            <div className="team-content-left-members-container">
              <div className="team-content-left-members-header">
                <div className="team-content-title">Members</div>
                <div>
                  <AiOutlineEllipsis onClick={handleMenuClick} />
                  <Menu
                    style={{ marginTop: "40px" }}
                    anchorEl={anchorMenu}
                    keepMounted
                    open={Boolean(anchorMenu)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={leaveTeam}>Leave Team</MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="team-content-left-members--list">
                {teamUsers === undefined ? (
                  <Redirect to="/" />
                ) : (
                  teamUsers.map((user, i) => {
                    return <TeamMemberIcon user={user} key={i} />;
                  })
                )}

                <NewTeamMemberIcon
                  setTeamUsers={setTeamUsers}
                  teamId={teamId}
                />
              </div>
            </div>
          </div>
          <div className="team-page-content-right">
            <div className="team-content-right-header">
              <div className="team-content-title">Projects</div>
            </div>
            <div className="team-content-right-projects--list">
              {teamProjects === undefined ? (
                <Redirect to="/" />
              ) : (
                teamProjects.map((project, i) => {
                  return (
                    <ProjectTile
                      teamId={teamId}
                      project={project}
                      key={i}
                      id={project.id}
                    />
                  );
                })
              )}
              {/* {projectsList} */}
              <NewProjectTile showSideProjectForm={showSideProjectForm} />
            </div>
          </div>
        </div>
        {sideProjectForm ? (
          <AddProjectPopOut
            showSideProjectForm={showSideProjectForm}
            setTeamProjects={setTeamProjects}
            title={"Add Project"}
          />
        ) : null}
      </div>
    </>
  );
};

export default TeamPage;