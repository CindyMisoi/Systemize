import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { getUserTasks } from "../../redux/actions/TaskActions";
import Loader from "../Loader";

//Form to add task from anywhere
const AddTaskForm = ({
  setTasklists,
  showSideTaskForm,
  // projects,
  dispatchGetUserTasks,
}) => {
  const { handleSubmit } = useForm();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const getProjectTasklists = async (projectId) => {
    const res = await apiServer.get(`/projects/${projectId}/tasklists`);
    setTasklists(res.data);
  };

  const onSubmit = async (data) => {
    const { name, projectId, userId, due_date, tasklistId, completed, description } = data;

    await apiServer.post(`/task_lists/${tasklistId}/task`, {
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

  // projects
  const getAllProjects = async () => {
    const res = await apiServer.get("/projects");
    setProjects(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  const renderedProjects = projects.map((project, i) => {
    return (
      <option key={i} id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  // users
  const getAllUsers = async () => {
    const res = await apiServer.get("/users");
    setUsers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const renderedUsers = users.map((user, i) => {
    return (
      <option key={i} id={user.id} value={user.id}>
        {user.name} - {user.email}
      </option>
    );
  });

  // tasklists
  const getAllTasklists = async () => {
    const res = await apiServer.get("/task_lists");
    setTaskLists(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllTasklists();
  }, []);

  const renderedTasklists = taskLists.map((tasklist, i) => {
    return (
      <option key={i} id={tasklist.id} value={tasklist.id}>
        {tasklist.name}
      </option>
    );
  });

  if (loading) {
    return (
    <Loader />
    );
  }

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
                // onChange={getProjectUsers}
              >
                <option value={0}>{"<---Choose Project--->"}</option>
                {renderedProjects}
              </select>
              {!name && (
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
              {!name && (
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
              {!name && (
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

export default AddTaskForm;