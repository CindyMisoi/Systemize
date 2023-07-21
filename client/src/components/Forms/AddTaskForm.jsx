import React, { useState, useContext, useEffect } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import { Context as TaskContext } from "../../context/store/TaskStore";

const TaskForm = ({
  setTasklists,
  showSideTaskForm,
}) => {
  const { register, handleSubmit, formState: {errors}, setValue } = useForm();
  const [projectError, setProjectError] = useState();
  const [assigneeError, setAssigneeError] = useState();
  const [taskName, setTaskName] = useState();
  const [dueDate, setDueDate] = useState();
  const [open, setOpen] = useState(false);

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
    const taskName = e.target.value;
    console.log("Task Name:", taskName);
    setTaskName(taskName);
    setValue("name", taskName);
  };

  const handleDateChange = (e) => {
    const dueDate = e.target.value;
    console.log("Due Date:", dueDate);
    setDueDate(dueDate);
    setValue("due_date", dueDate);
  };

  const getProjectUsersAndTasklists = async (projectId) => {
    try {
      const userRes = await apiServer.get(`/projects/${projectId}/team`);
      setProjectUsers(userRes.data.users);

      const tasklistRes = await apiServer.get(`/projects/${projectId}/tasklists`);
      setProjectTaskLists(tasklistRes.data);
    } catch (error) {
      console.error("Error fetching project users or tasklists:", error);
    }
  };

  const onSubmit = async ({
        name,
        projectId,
        userId,
        due_date,
        tasklistId,
        completed,
        description,
      }) => {
        projectId = parseInt(projectId);
        userId = parseInt(userId);
        tasklistId = parseInt(tasklistId);
        console.log("form is submitted with data:", {
          name,
          projectId,
          userId,
          due_date,
          tasklistId,
          completed,
          description,
        });
        await apiServer.post(`/task_lists/${tasklistId}/task`, {
          name,
          projectId,
          userId,
          due_date,
          tasklistId,
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
          console.log(taskResponse.data);
        }
    
        showSideTaskForm();
      };

  useEffect(() => {
    if (projectState.projects.length > 0) {
      const initialProjectId = projectState.projects[0].id;
      getProjectUsersAndTasklists(initialProjectId);
    }
  }, [projectState.projects]);

  const renderedProjects = projectState.projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ));

  const renderedUsers = projectUsers.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const renderedTasklists = projectTaskLists.map((tasklist) => (
    <option key={tasklist.id} value={tasklist.id}>
      {tasklist.name}
    </option>
  ));

  return (
    <>      
     <Button onClick={openModal}>Open modal</Button>
      <Modal open={open} onClose={closeModal}>
        <div className="modal-container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name",{ required: true })}
              />
              {errors.name && (
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
                onChange={(e) => {
                  setValue("assigneeId", "");
                  getProjectUsersAndTasklists(e.target.value);
                }}
                {...register("projectId",{ required: true })}
              >
                <option value={0}>{"<---Choose Project--->"}</option>
                {renderedProjects}
              </select>
              {errors.projectId && (
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
                {...register("due_date",{ required: true })}
              />
              {errors.due_date && (
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
                {...register("userId",{ required: true })}
              >
                <option value="">{"<---Choose Assignee--->"}</option>
                {renderedUsers}
              </select>
              {errors.assigneeId && (
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
                {...register("completed",{required: false})}
              />
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
                {projectTaskLists.length === 0 ? (
                  <option>
                    You need to make a column in your project first.
                  </option>
                ) : (
                  renderedTasklists
                )}
               </select>
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
                {...register("description", { required: true })}
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
                  errors.name && errors.due_date
                    ? "submit-button disabled"
                    : "submit-button enabled"
                }
                disabled={errors.name && errors.due_date}
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