import React, { useState, useEffect, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

import Loader from "../Loader";

//Form to add task from anywhere
const TaskForm = ({setTasklists,showSideTaskForm}) => {
  const { handleSubmit, clearErrors, register, formState: {errors}} = useForm();
  const [projectError, setProjectError] = useState();
  const [assigneeError, setAssigneeError] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);

  // state
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [projectUsers, setProjectUsers] = useState([]);
  const [projectTaskLists, setProjectTaskLists] = useState([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };


  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const getProjectUsers = async (event) => {
    var projectSelect = document.getElementById("project-select");
    var assigneeSelect = document.getElementById("assignee-select");
    var tasklistSelect = document.getElementById("tasklist-select");
    clearErrors(projectSelect.name);
    clearErrors(assigneeSelect.name);
    clearErrors(tasklistSelect.name);
    const res = await apiServer.get(`/projects/${projectSelect.value}/team`);
    setProjectUsers(res.data.Users);
    // console.log(res.data.Users);
    getProjectTasklists();
  };

  const getProjectTasklists = async (projectId) => {
    const res = await apiServer.get(`/projects/${projectId}/tasklists`);
    setProjectTaskLists(res.data);
  };

  //  useEffect(() => {
  //   getUserProjects();
  // }, []);

  //Probably need dispatch here to update the task page when task is created.
  const onSubmit = async ({
    name,
    projectId,
    userId,
    due_date,
    tasklistId,
    completed,
    description,
  }) => {
    await apiServer.post(`/task_lists/${tasklistId}/task`, {
      name,
      projectId,
      userId,
      due_date,
      completed,
      description,
    });

    const storedUserId = sessionStorage.getItem("userId");
    const res = await apiServer.get(`/tasks/user/${storedUserId}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });

    if (setTasklists) {
      const taskResponse = await apiServer.get(
        `/projects/${projectId}/tasklists`
      );

      setTasklists(taskResponse.data);
    }

    showSideTaskForm();
  };


  const renderedProjects = projectState.projects && projectState.projects.length > 0 ? projectState.projects.map((project, i) => {  
    return (
        <option key={i} id={project.id} value={project.id}>
          {project.name}
        </option>
      ); }) : null;

  const renderedUsers = projectUsers && projectUsers.length > 0 ? projectUsers.map((user, i) => {  
    return (
        <option key={i} value={user.id}>
          {user.name}
        </option>
      ); }) : null;

  const renderedTasklists = projectTaskLists.length > 0 ? projectTaskLists.map((tasklist, i) => { 
    return (
        <option key={i} value={tasklist.id}>
          {tasklist.name}
        </option>
      ); }) : null;

   
    
  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <Modal open={open} onClose={closeModal}>
        <div className="modal-container">
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
                onChange={handleNameChange}
                {...register("name",{required: true})}
              ></input>
              {errors.name?.type === "required" && (
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
                {...register("projectId",{required: true})}
              >
                <option value={0}>{"<---Choose Project--->"}</option>
                {renderedProjects}
              </select>
              {errors.projectId?.type === "required" && (
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
                {...register("due_date",{required: true})}
              ></input>
              {errors.due_date?.type === "required" && (
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
                {...register("userId",{required: true})}
                onChange = {() => setAssigneeError("")}
              >
                {renderedUsers}
              </select>
              {errors.userId?.type === "required" || assigneeError !== "" && (
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
                {...register}
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
                {...register("tasklistId",{required: true})}
              >
                {/* <option value={0}>Choose a project first</option> */}
                {projectTaskLists.length === 0 ? (
                  <option>
                    You need to make a column in your project first.
                  </option>
                ) : (
                  renderedTasklists
                )}
                {/* {renderedTasklists} */}
              </select>
              {/* <p className="error-message">{taskListError}</p> */}
              {errors.tasklistId?.type === "required" && (
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
      </div>
      </Modal>
      </>
  );
};

export default TaskForm;