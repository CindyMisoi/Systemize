import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import apiServer from "../../config/apiServer";
import { getTeamProjects } from "../../redux/actions/TeamActions";
import { getUserProjects } from "../../redux/actions/ProjectActions";
import "../../css/Forms.css";

const ProjectForm = ({
  handleNewClose,
  clickClose,
  open,
  setTeamProjects,
  showSideProjectForm,
}) => {
  const {handleSubmit, clearErrors } = useForm();
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();
  const teamState = useSelector(state => state.team);
  const userId = localStorage.getItem("userId");

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async ({ name, teamId }) => {
    await apiServer.post(`/teams/${teamId}/projects`, {
      name,
      userId,
    });

    dispatch(getUserProjects(userId));

    const teamResponse = await apiServer.get(`/teams/${teamId}`);
    dispatch(getTeamProjects(teamResponse.data));

    if (setTeamProjects) {
      const teamProjects = teamResponse.data.Projects;
      setTeamProjects(teamProjects);
    }

    showSideProjectForm();
  };

  const clearError = () => {
    var teamSelect = document.getElementById("team-select");
    clearErrors(teamSelect.name);
  };

  const renderedTeams = teamState.teams.map((team) => (
    <option key={team.id} id={team.id} value={team.id}>
      {team.name}
    </option>
  ));

  return (
    <>
      {/* <Modal open={open} onClose={clickClose}>
        <div className="modal-container"> */}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Project</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Project Name</label>
            </div>
            <div className="input-container">
              <input
                name="name"
                type="text"
                placeholder={"Project Name"}
                className="form-input"
                // onChange={clearError}
                onChange={handleNameChange}
                onKeyPress={handleUserKeyPress}
              ></input>
              {!name && (
                <p className="error-message">Please fill out project name</p>
              )}
            </div>
            <div className="label-container">
              <label className="form-label">Team</label>
            </div>
            <div className="input-container">
              <select
                id="team-select"
                name="teamId"
                className="form-input"
              >
                {renderedTeams}
              </select>
              {!teamId && (
                <p className="error-message">Please choose a team</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-button-container">
          {/* marginLeft: "400px" */}
          <button
            className="cancel-button"
            onClick={showSideProjectForm}
            color="primary"
          >
            Cancel
          </button>
          <button
            className={
              projectName ? "submit-button enabled" : "submit-button disabled"
            }
            disabled={projectName ? false : true}
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </>
    //   </Modal>
    // </div>
  );
};

export default ProjectForm;