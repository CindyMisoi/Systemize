import React, { useEffect, useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import { Context as TasklistContext } from "../../context/store/TasklistStore";

// form to add task from selected project
const AddTaskProjectForm = ({
  tasklistId,
  setTasklistTasks,
  setTasklists,
  showSideTaskForm,
}) => {
  const {handleSubmit } = useForm();
  const { teamId, projectId } = useParams();
  const [projectUsers, setProjectUsers] = useState();
  const [loading, setLoading] = useState(true);
  // state
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);

  const { selectedTasklist } = tasklistState;
  const getProjectUsers = async (event) => {
    const res = await apiServer.get(`/team/${teamId}/users`);
    setProjectUsers(res.data[0].Users);
    setLoading(false);
  };

  useEffect(() => {
    getProjectUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  //Probably need dispatch here to update the task page when task is created.
  const onSubmit = async ({
    name,
    userId,
    due_date,
    completed,
    description,
  }) => {
    console.log(userId);
    console.log(projectId);
    console.log(due_date);
    console.log(completed);
    await apiServer.post(`/task_lists/${selectedTasklist}/task`, {
      name,
      projectId,
      userId,
      due_date,
      completed,
      description,
    });

 
    const resp = await apiServer.get(`/projects/${projectId}/tasklists`);
    setTasklists(resp.data);
    showSideTaskForm();
  };

  if (loading) {
    return <Loader />;
  }


  const renderedUsers = projectUsers.map((user, i) => (
    <option key={i} value={user.id}>
      {user.name}
    </option>
  ));
  
  // loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-top-container">
          <div className="form-section">
            <div className="input-section">
              <div className="label-container">
                <label className="form-label">Task Name</label>
              </div>
              <div className="input-container">
                <input
                  name="name"
                  type="text"
                  placeholder={"Task Name"}
                  className="form-input"
                />
                {!name && (
                  <p className="error-message">Please enter a task name</p>
                )}
              </div>
            </div>

            <div className="input-section">
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
          </div>
          <div className="form-section" style={{ marginTop: "42px" }}>
            <div className="input-section">
              <div className="label-container">
                <label className="form-label">Due date</label>
              </div>
              <div className="input-container">
                <input
                  className="form-input"
                  type="date"
                  name="due_date"
                ></input>
                {!name && (
                  <p className="error-message">Please choose a due_date</p>
                )}
              </div>
            </div>

            <div className="input-section">
              <div className="label-container">
                <label
                  className="form-label"
                  style={{ padding: "10px 5px 10px 0px" }}
                >
                  Mark Complete
                </label>
              </div>
              <div className="input-container">
                <input
                  style={{
                    margin: "0px 0px 14px 40px",
                    width: "16px",
                    height: "16px",
                  }}
                  type="checkbox"
                  name="completed"
                  //here
                  defaultChecked={false}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div>
          <textarea
            name="description"
            type="text"
            placeholder={"Task Description"}
            className="edit-task-description textarea"
          ></textarea>
        </div>

        <div className="form-button-container">
          <Button
            style={{ color: "#0093ff" }}
            onClick={showSideTaskForm}
            color="primary"
          >
            Cancel
          </Button>
          <Button style={{ color: "#0093ff" }} type="submit" color="primary">
            Add
          </Button>
        </div>
      </form>
      </div> 
  );
};
export default AddTaskProjectForm;