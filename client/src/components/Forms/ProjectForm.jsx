import React, { useState, useContext } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { Context as TeamContext } from "../../context/store/TeamStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import apiServer from "../../config/apiServer";
import "../../css/Forms.css";

const ProjectForm = ({
  // setTeamProjects,
  showSideProjectForm}) => {
  const {handleSubmit, register, formState: {errors} } = useForm();
  const [projectName, setProjectName] = useState("");
  // state
  const [teamState, teamdispatch] = useContext(TeamContext);
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [teamProjects, setTeamProjects] = useState([]);

  const userId = sessionStorage.getItem("userId");
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    console.log("Handle name change:", e.target.value);
    setProjectName(e.target.value);
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      console.log("Enter key pressed, submitting form...");
      handleSubmit(onSubmit)();
    }
  };

  // create project for a team
  const onSubmit = async ({ name, teamId }) => {
    try {
      console.log("Submitting form with name:", name, "and teamId:", teamId);
      await apiServer.post(`/teams/${teamId}/project`, {
        name,
        userId,
      });
      console.log("Project added successfully");
  
      //REFER TO THIS WHEN CHECKING FOR RERENDERING
      const res = await apiServer.get(`/projects/user/${userId}`);
      await projectdispatch({ type: "get_user_projects", payload: res.data });
  
      const projectResponse = await apiServer.get(`/teams/${teamId}`);
      // NOTE: One way this could work is if we recreate form for just team page add project form button
      // Will not work with top nav bar form
      // setTeamProjects(projectResponse.data.Projects);
      await teamdispatch({
        type: `get_team_projects${teamId}`,
        payload: projectResponse.data,
      });
  
      if (setTeamProjects) {
        const teamResponse = await apiServer.get(`/teams/${teamId}`);
        console.log(teamResponse.data.projects);
        setTeamProjects(teamResponse.data.projects);
      }
      showSideProjectForm();
      setOpen(false);
    } catch (err) {
      console.error("Error occurred while submitting form:", err);
    }
  };

  const renderedTeams = teamState.teams.map((team, i) => (
    <option key={i} id={team.id} value={team.id}>
      {team.name}
    </option>
  ));

  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <Modal open={open} onClose={closeModal}>
        <div className="modal-container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-header">Add a Project</h2>
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
                {...register("name",{required: true})}
              ></input>
              {errors.name?.type === "required" && (
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
                {...register("teamId",{required: true})}
              >
                {renderedTeams}
              </select>
              {errors.teamId?.type === "required" && (
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
           className="submit-button enabled"
           type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
      </div>
      </Modal>
    </>
  );
};

export default ProjectForm;