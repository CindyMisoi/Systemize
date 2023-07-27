import React, { useState, useContext } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "./TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, MenuItem } from "@material-ui/core";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

//Task item list for home and task page

const TaskItemHome = ({ task, showSideTaskDetails, sideTaskDetails }) => {

  if(!task || !task.due_date) {
    return <div>Loading...</div>
  } 
  const date = task?.due_date? moment(
    task?.due_date?.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  ): null;
  
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      //---
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      // setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      // setInitialLoad(false);
    }
  };

  const handleTaskDelete = async (e) => {
    // console.log(task.id);
    handleMenuClose();
    await apiServer.delete(`/tasks/${task.id}`);
    const id = sessionStorage.getItem("userId");
    const res = await apiServer.get(`/tasks/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };
  //import component as body such as forms, details, etc
  // const body = (
  //   <div className="modal-container">
  //     {/* <h2 id="modal-title">Task Detail</h2>
  //     <p id="modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p> */}
  //     <TaskDetailsForm task={task} closeModal={closeModal} />
  //   </div>
  // );
  
  return (
    <>
      <div className="task-home-item">
        <div className="task-home-item-inner-container">
          <div className="task-home-item-inner-left" onClick={setTaskPopOut}>
            <div className="task-home-item-icon-container">

              <span className={`dot-task-${task.id}`}></span>
            </div>
            <div className="task-home-item-name-container">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  margin: "0px",
                }}
              >
                {task.name}
              </p>
              <p style={{ color: "grey", margin: "0" }}>
                {date.format("MMM D")}
              </p>
            </div>
          </div>
          <div
            className="task-home-item-more-menu"
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <AiOutlineEllipsis style={{ fontSize: "24px" }} />
          </div>
          <Menu
            style={{}}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default TaskItemHome;
