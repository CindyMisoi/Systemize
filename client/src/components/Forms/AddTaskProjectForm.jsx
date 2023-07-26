import React, { useEffect, useState, useContext } from "react";
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
  setTasklists,
  showSideTaskForm,
}) => {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const { teamId, projectId } = useParams();
  const [projectUsers, setProjectUsers] = useState();
  const [loading, setLoading] = useState(true);
  // state
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);

  const { selectedTasklist } = tasklistState;
  const getProjectUsers = async () => {
    try{
    const res = await apiServer.get(`/teams/${teamId}/users`);
    setProjectUsers(res.data);
    setLoading(false);
    console.log("Project Users:", res.data);
    }catch(err){
      console.error("Error getting project users:", err);
    }
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
    console.log("onSubmit is called");
   const  selectedUserId = parseInt(userId);
   const selectedProjectId = parseInt(projectId);
    
    console.log("Task data to be sent:", {
      name,
      selectedUserId,
      selectedProjectId,
      due_date,
      completed,
      description,
    });
  
    try{
      const tasklistData = {
        name: name,
        project_id: selectedProjectId,
        user_id: selectedUserId,
        due_date: due_date,
        completed: completed,
        description: description,
      };
  
    await apiServer.post(`/tasklists/${selectedTasklist}/task`, tasklistData);
 
    const resp = await apiServer.get(`/projects/${projectId}/tasklists`);
    setTasklists(resp.data);
    console.log(resp.data);
    showSideTaskForm();
  }catch(err){
     console.error("Error getting tasklists:", err)
  }
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
                  {...register("name",{required:true})}
                />
               {errors.name?.type === "required" && (
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
                  {...register("userId",{required:true})}
                >
                  {renderedUsers}
                </select>
                {errors.userId?.type === "required" && (
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
                  {...register("due_date",{required:true})}
                ></input>
                {errors.due_date?.type === "required" && (
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
                  {...register("completed",{required: false})}
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
            {...register("description",{required: true})}
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