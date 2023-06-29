import React, { useEffect, useState, useContext } from "react";
import {useParams, useNavigate } from "react-router-dom";
import TopNavBar from "../NavigationBar/TopNavBar";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import "../../css/TeamPage.css";
import { Menu, MenuItem } from "@material-ui/core";
import { Context as TeamContext } from "../../context/store/TeamStore";

import TeamMemberIcon from "../teams/TeamMemberIcon";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import NewTeamMemberIcon from "../teams/NewTeamMemberIcon";
import AddProjectPopOut from "../PopOutMenu/AddProjectPopOut";
import { BiBorderNone } from "react-icons/bi";
import { AiOutlineEllipsis } from "react-icons/ai";

const TeamPage = () => {
  const { teamId, name } = useParams();
  const [team, setTeam] = useState();
  const [teamProjects, setTeamProjects] = useState();
  const [teamUsers, setTeamUsers] = useState(null);
  const [teamDescription, setTeamDescription] = useState();
  const [loading, setLoading] = useState(true);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [sideProjectForm, setSideProjectForm] = useState(false);
  const [teamState, teamdispatch] = useContext(TeamContext);
  const navigate = useNavigate();
  navigate('/')

  const showSideProjectForm = () => {
    setSideProjectForm(!sideProjectForm);
  };
  console.log(teamUsers);
  const getTeam = async () => {
    try {
      const res = await apiServer.get(`/teams/${teamId}`);
      console.log(res);
      setTeam(res.data);
      setTeamProjects(res.data.Projects);
      setTeamUsers(res.data.Users);
      setTeamDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const leaveTeam = async () => {
    const userId = localStorage.getItem("userId");
    handleMenuClose();
    await apiServer.delete(`/user_teams/${teamId}/user/${userId}`);
    const res = await apiServer.get(`/teams/user/${userId}`);
    await teamdispatch({ type: "get_user_teams", payload: res.data });
    history.push("/");
    // const resp = await apiServer.get(`/project/${projectId}/tasklists`);
    // setTasklists(resp.data);
  };

  const handleUpdate = (e) => {
    setTeamDescription(e.target.value);
  };

  const updateDescription = async (e) => {
    const description = e.target.value;
    await apiServer.put(`/teams/${teamId}/description`, { description });
    console.log(e.target.value);
  };

  useEffect(() => {
    getTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, name, setTeam, setTeamProjects, setTeamUsers]);

  if (loading) {
    return <Loader />;
  }

  // const membersList = teamUsers.map((user, i) => {
  //   return <TeamMemberIcon user={user} key={i} />;
  // });

  // const projectsList = teamProjects.map((project, i) => {
  //   return (
  //     <ProjectTile teamId={teamId} project={project} key={i} id={project.id} />
  //   );
  // });
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