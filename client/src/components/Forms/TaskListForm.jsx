import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import apiServer from "../../config/apiServer";


const TaskListForm = ({ setTasklists, showSideTasklistForm }) => {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [tasklistName, setTasklistName] = useState();
  const { projectId } = useParams();

  const handleNameChange = (e) => {
    setTasklistName(e.target.value);
  };

  const onSubmit = async ({ name }) => {
    const userId = sessionStorage.getItem("userId");
    await apiServer.post(`/projects/${projectId}/tasklist`, { name, userId });

    const res = await apiServer.get(`/projects/${projectId}/tasklists`);
    setTasklists(res.data);
    // tasklistdispatch({ type: "update_project_tasklists", payload: res.data });
    showSideTasklistForm();
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
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
              {...register("name",{required:true})}
            ></input>
            {errors.name?.type === "required" && (
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
