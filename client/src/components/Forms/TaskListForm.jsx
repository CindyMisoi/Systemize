import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useParams } from "react-router-dom";
import apiServer from "../../config/apiServer";
import { updateProjectTasklists } from "../../redux/actions/TasklistActions";

const TaskListForm = ({ showSideTasklistForm }) => {
  const {handleSubmit} = useForm();
  const [tasklistName, setTasklistName] = useState("");
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setTasklistName(e.target.value);
  };

  const onSubmit = ({ name }) => {
    const userId = localStorage.getItem("userId");
    apiServer
      .post(`/projects/${projectId}/tasklist`, { name, userId })
      .then(() => {
        return apiServer.get(`/projects/${projectId}/tasklists`);
      })
      .then((res) => {
        dispatch(updateProjectTasklists(res.data));
        showSideTasklistForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-top-container">
        <div className="form-section">
          <div className="label-container">
            <label className="form-label">Column Name</label>
          </div>
          <div className="input-container">
            <input
              name="name"
              type="text"
              placeholder={"Column Name"}
              className="form-input"
              onChange={handleNameChange}
              onKeyPress={handleUserKeyPress}
            ></input>
            {!name && (
              <p className="error-message">Please enter a column name</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-button-container">
        <button className="cancel-button" onClick={showSideTasklistForm}>
          Cancel
        </button>
        <button
          className={
            tasklistName ? "submit-button enabled" : "submit-button disabled"
          }
          disabled={tasklistName ? false : true}
          type="submit"
        >
          Create Column
        </button>
      </div>
    </form>
  );
};

export default TaskListForm;
