import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { RiCloseLine } from "react-icons/ri";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCheck } from "react-icons/bi";

import {
  getSelectedTask,
  getUserTasks,
  updateTask,
} from "../../redux/actions/TaskActions";

const PopOutTaskDetailsHome = ({
  showSideTaskDetails,
  selectedTask,
  getSelectedTask,
  getUserTasks,
  updateTaskComplete,
}) => {
  const [teamDescription, setTeamDescription] = useState(selectedTask.description);
  const [assigneeUser, setAssigneeUser] = useState(selectedTask.User);
  const [taskComments, setTaskComments] = useState(selectedTask.Comments);
  const [dueDate, setDueDate] = useState(new Date(selectedTask.due_date));
  const [commentBox, setCommentBox] = useState(false);

  var completed = selectedTask.completed;
  const date = moment(
    selectedTask.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const { register, handleSubmit, clearErrors } = useForm();

  const getProjectUsers = async (event) => {
    // Your code for getting project users
  };

  const updateProject = async (e) => {
    // Your code for updating the project
  };

  const updateAssignee = async (e) => {
    // Your code for updating the assignee
  };

  const updateDueDate = async (date) => {
    // Your code for updating the due date
  };

  const updateDescription = async (e) => {
    // Your code for updating the description
  };

  const handleDescriptionUpdate = (e) => {
    setTeamDescription(e.target.value);
  };

  const handleCommentSubmit = async ({ text }) => {
    // Your code for submitting a comment
  };

  const handleMarkComplete = async () => {
    await updateComplete();
  };

  const updateComplete = async () => {
    completed = !completed;
    const updatedTask = await apiServer.put(`/task/${selectedTask.id}/complete`, {
      completed,
    });
    getSelectedTask(updatedTask.data);
    const res = await apiServer.get(`/task/user/${selectedTask.User.id}`);
    getUserTasks(res.data);
  };

  const expandCommentBox = () => {
    setCommentBox(!commentBox);
  };

  function updateScroll() {
    var element = document.getElementById("scrollable");
    element.scrollTop = element.scrollHeight;
  }

  const renderedProjects = selectedTask.Projects.map((project, i) => {
    return (
      <option key={i} id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  const renderedUsers = selectedTask.Project.Users.filter((user) => {
    return user.id !== selectedTask.User.id;
  }).map((user, i) => {
    return (
      <option key={i} value={user.id}>
        {user.name}
      </option>
    );
  });

  const renderedComments = taskComments.map((comment, i) => {
    const commentDate = moment(
      comment.createdAt.substring(0, 10).replace("-", ""),
      "YYYYMMDD"
    ).format("MMM D");

    return (
      <div className="comment-container">
        <div className="comment-header">
          <div
            className="user-avatar"
            style={{
              width: "25px",
              height: "25px",
              marginRight: "10px",
            }}
          >
            {(comment.User.name[0] + comment.User.name[1]).toUpperCase()}
          </div>

          <div>
            <p
              style={{ fontWeight: 500, marginRight: "10px", fontSize: "15px" }}
            >
              {comment.User.name}
            </p>
          </div>
          <div>
            <p style={{ color: "gray", fontSize: "12px" }}>{commentDate}</p>
          </div>
        </div>
        <div className="comment-text">
          <p style={{ fontSize: "15px", margin: "0px" }}>{comment.text}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div
        className={"task-detail-menu active"}
        style={{ width: "50%", height: "96%" }}
      >
        <div
          style={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "1px",
            overflow: "hidden",
          }}
        >
          <div className="task-detail-menu-container">
            <div className="task-detail-menu-top">
              <div
                className={
                  completed
                    ? "mark-complete-container__completed"
                    : "mark-complete-container__incompleted"
                }
                onClick={handleMarkComplete}
              >
                <div
                  className={
                    completed
                      ? "complete-button__completed"
                      : "complete-button__incompleted"
                  }
                >
                  <div
                    className="check-mark-container"
                    style={{ margin: "0px 5px" }}
                  >
                    <BiCheck
                      className={
                        completed
                          ? "check-mark-icon__completed"
                          : "check-mark-icon__incompleted"
                      }
                    />
                  </div>
                  <div
                    className={
                      completed
                        ? "mark-complete__completed"
                        : "mark-complete__incompleted"
                    }
                  >
                    Mark Complete
                  </div>
                </div>
              </div>
              <div className="task-detail-close-icon">
                <RiCloseLine
                  style={{
                    color: "black",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={showSideTaskDetails}
                />
              </div>
            </div>

            {/* <div style={{ height: "80%" }}> */}
            <div
              id="scrollable"
              style={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                minHeight: "1px",
                zIndex: "100",
                padding: "0 24px",
                overflowY: "auto",
                borderBottom: "1px solid lightgrey",
                marginBottom: "5px",
              }}
            >
              <div>
                <form className="task-detail-menu-main-content">
                  <div className="task-detail-title">
                    <h2>{task.name}</h2>
                  </div>
                  <div className="task-details-container">
                    <div className="task-details-subtitles">
                      <p>Assignee</p>
                      <p>Due Date</p>
                      <p>Project</p>
                      <p>Description</p>
                    </div>
                    <div className="task-details-data">
                      <div
                        className="assignee-select-container"
                        style={{ display: "flex" }}
                      >
                        <div
                          className="user-avatar"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: "10px",
                          }}
                        >
                          {(
                            assigneeUser.name[0] + assigneeUser.name[1]
                          ).toUpperCase()}
                        </div>
                        <select
                          id="assignee-select"
                          name="assigneeId"
                          className="form-input"
                          ref={register({ required: true })}
                          onChange={updateAssignee}
                          style={{ width: "150px" }}
                        >
                          <option
                            value={task.User.id}
                            id={task.User.id}
                            selected
                          >
                            {task.User.name}
                          </option>
                          {renderedUsers}
                        </select>
                      </div>
                      <div
                        className="dueDate-container"
                        style={{ marginTop: "20px" }}
                      >
                        <DatePicker
                          selected={dueDate}
                          onChange={(date) => updateDueDate(date)}
                          // customInput={<DateButton />}
                        />
                        {/* <p style={{ marginTop: "20px" }}> {date.format("MMM D")}</p> */}
                      </div>

                      <div
                        className="project-select-container"
                        style={{
                          height: "25px",
                          borderRadius: "20px",

                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <select
                          id="project-select"
                          name="projectId"
                          className={`form-input `}
                          onChange={getProjectUsers}
                          defaultValue={task.Project.name}
                          ref={register({ required: true })}
                          onBlur={updateProject}
                          style={{
                            height: "25px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            background: "transparent",
                            justifyContent: "center",
                          }}
                        >
                          <option
                            value={task.Project.id}
                            id={task.Project.id}
                            selected
                          >
                            {task.Project.name}
                          </option>
                          {renderedProjects}
                        </select>
                        {/* <p style={{ margin: 0 }}> {task.Project.name}</p> */}
                      </div>

                      {/* <p style={{ marginTop: "17px" }}> {task.description}</p> */}
                      <div className="task-detail-description-container">
                        <textarea
                          className="task-detail-edit-description"
                          placeholder="Click to add team description..."
                          value={teamDescription}
                          onChange={handleDescriptionUpdate}
                          onBlur={updateDescription}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="task-detail-user-comments-container">
                  {taskComments.length !== 0 ? (
                    renderedComments
                  ) : (
                    <div>No comments yet.. </div>
                  )}
                </div>
              </div>
            </div>
            <div
              // className={
              //   commentBox
              //     ? "task-detail-comment-container active"
              //     : "task-detail-comment-container"
              // }
              className="task-detail-comment-container"
            >
              <div
                // className={
                //   commentBox
                //     ? "task-detail-user-comment active"
                //     : "task-detail-user-comment"
                // }
                className="task-detail-user-comment"
              >
                <div
                  className="task-detail-comment-avatar"
                  style={{ width: "25px", height: "25px", fontSize: "10px" }}
                >
                  <UserAvatar id={localStorage.getItem("userId")} />
                </div>
                <div className="task-detail-comment-box">
                  <form
                    className="task-detail-comment-form"
                    onSubmit={handleSubmit(handleCommentSubmit)}
                    onFocus={expandCommentBox}
                    onBlur={expandCommentBox}
                  >
                    <div style={{ width: "100%", height: "100%" }}>
                      <textarea
                        name="text"
                        className="comment-textarea"
                        placeholder="Ask a question or post an update..."
                        ref={register({ required: true })}
                      ></textarea>
                    </div>

                    {/* {commentBox ? ( */}
                    <div style={{ alignSelf: "flex-end", marginTop: "10px" }}>
                      <button
                        className="comment-button"
                        style={{ height: "30px", width: "80px" }}
                        type="submit"
                      >
                        Comment
                      </button>
                    </div>
                    {/* ) : null} */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopOutTaskDetailsHome;
