import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import apiServer from "../../config/apiServer";


const TaskListForm = ({ setTasklists, showSideTasklistForm }) => {
  const {handleSubmit, register, formState: {errors}, setValue} = useForm();
  const [tasklistName, setTasklistName] = useState();
  const [columnIndex, setColumnIndex] = useState();
  const { projectId } = useParams();

  const handleNameChange = (e) => {
    const tasklistName = e.target.value;
    setTasklistName(tasklistName);
    setValue("name", tasklistName);
  };
  const handleColumnIndexChange = (e) => {
    const columnIndex = e.target.value;
    setColumnIndex(columnIndex);
    setValue("columnIndex", columnIndex);
  };

  const onSubmit = async ({ name, columnIndex }) => {

    try {
    let userId = sessionStorage.getItem("userId");

    columnIndex = parseInt(columnIndex);
    userId = parseInt(userId);

    const tasklistData = {name, user_id: userId, column_index: columnIndex}

   
    console.log("Tasklist data sent:" ,tasklistData);
    await apiServer.post(`/projects/${projectId}/tasklist`, tasklistData);

    console.log("Tasklist created successfully");
    const res = await apiServer.get(`/projects/${projectId}/tasklists`);
    setTasklists(res.data);

    // tasklistdispatch({ type: "update_project_tasklists", payload: res.data });
    showSideTasklistForm();
    }catch (err){
      console.log("Error creating tasklist:", err);
    }
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
              value={tasklistName}
              onKeyPress={handleUserKeyPress}
              {...register("name",{required:true})}
            ></input>
            {errors.name?.type === "required" && (
              <p className="error-message">Please enter a column name</p>
            )}
          </div>
          <div className="label-container">
            <label className="form-label">Column Index</label>
          </div>
          <div className="input-container">
            <input
              name="columnIndex"
              type="number"
              placeholder={"Column Index"}
              className="form-input"
              onChange={handleColumnIndexChange}
              value={columnIndex}
              onKeyPress={handleUserKeyPress}
              {...register("columnIndex",{required:true})}
            ></input>
            {errors.columnIndex?.type === "required" && (
              <p className="error-message">Please enter a column Index</p>
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
                  errors.name && errors.columnIndex
                    ? "submit-button disabled"
                    : "submit-button enabled"
                }
                disabled={errors.name && errors.columnIndex}
                type="submit"
              >
                Create Column
              </button>
      </div>
    </form>
  );
};

export default TaskListForm;
