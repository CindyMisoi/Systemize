import React, { useState } from "react";
import { connect } from "react-redux";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { getUserTasks } from "../../redux/actions/TaskActions";

//Form to add task from anywhere
const TaskForm = ({
  handleNewClose,
  clickClose,
  open,
  setTasklists,
  showSideTaskForm,
  projects,
  dispatchGetUserTasks,
}) => {
  const { handleSubmit } = useForm();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const getProjectTasklists = async (projectId) => {
    const res = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(res.data);
  };

  const onSubmit = async (data) => {
    const { name, projectId, userId, due_date, tasklistId, completed, description } = data;

    await apiServer.post(`/tasklist/${tasklistId}/task`, {
      name,
      projectId,
      userId,
      due_date,
      completed,
      description,
    });

    dispatchGetUserTasks();

    if (setTasklists) {
      getProjectTasklists(projectId);
    }

    showSideTaskForm();
  };

  const renderedProjects = projects.map((project, i) => {
    return (
      <option key={i} id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });
  return (
    <>
      {/* <Modal open={open} onClose={clickClose}>
        <div className="modal-container"> */}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Task</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Task Name</label>
            </div>
            <div className="input-container">
              <input
                name="name"
                type="text"
                placeholder={"Task Name"}
                className="form-input"
                // ref={register({ required: true })}
                onChange={handleNameChange}
              ></input>
              {!name && (
                <p className="error-message">Please enter a task name</p>
              )}
            </div>

            <div className="label-container">
              <label className="form-label">Project</label>
            </div>
            <div className="input-container">
              <select
                id="project-select"
                name="projectId"
                className="form-input"
                onChange={getProjectUsers}
              >
                <option value={0}>{"<---Choose Project--->"}</option>
                {renderedProjects}
              </select>
              <p className="error-message">{projectError}</p>
              {!projects && (
                <p className="error-message">Please choose a project</p>
              )}
            </div>
          </div>
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Due date</label>
            </div>
            <div className="input-container">
              <input
                className="form-input"
                type="date"
                name="due_date"
                onChange={handleDateChange}
              ></input>
              {!dueDate && (
                <p className="error-message">Please choose a Due Date</p>
              )}
            </div>
            <div className="label-container">
              <label className="form-label">Assignee</label>
            </div>
            <div className="input-container">
              <select
                id="assignee-select"
                name="userId"
                className="form-input"
              >
                {renderedUsers}
              </select>
              <p className="error-message">{assigneeError}</p>
              {!userId && (
                <p className="error-message">Please choose an assignee</p>
              )}
            </div>
          </div>
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Mark Complete</label>
            </div>
            <div className="input-container">
              <input
                style={{
                  margin: "9px 0px 18px 40px",
                  width: "16px",
                  height: "16px",
                }}
                type="checkbox"
                name="completed"
                defaultChecked={false}
              ></input>
            </div>

            <div className="label-container">
              <label className="form-label">Column</label>
            </div>
            <div className="input-container">
              <select
                id="tasklist-select"
                name="tasklistId"
                className="form-input"
                // {...register("tasklistId", { required: true })}
              >
                {/* <option value={0}>Choose a project first</option> */}
                {getProjectTasklists.length === 0 ? (
                  <option>
                    You need to make a column in your project first.
                  </option>
                ) : (
                  renderedTasklists
                )}
                {/* {renderedTasklists} */}
              </select>
              {/* <p className="error-message">{taskListError}</p> */}
              {!tasklistId && (
                <p className="error-message">
                  Please choose a column. You may need to make a column in your
                  project first before adding a task.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="form-description-container">
          <textarea
            name="description"
            type="text"
            placeholder={"Task Description"}
            className="edit-task-description textarea"
            // ref={register}
          ></textarea>
        </div>

        <div className="form-button-container">
          <button
            className="cancel-button"
            onClick={showSideTaskForm}
            color="primary"
          >
            Cancel
          </button>
          <button
            className={
              taskName && dueDate
                ? "submit-button enabled"
                : "submit-button disabled"
            }
            disabled={taskName && dueDate ? false : true}
            type="submit"
          >
            Create Task
          </button>
        </div>
      </form>
    </>
    //   </Modal>
    // </div>
  );
};

export default TaskForm;