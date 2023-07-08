import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "./TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { connect } from "react-redux";
import { getSelectedTask } from "../../redux/actions/TaskActions";
import apiServer from "../../config/apiServer";

const TaskItemTask = ({
  task,
  setSelectedTask,
  showSideTaskDetails,
  sideTaskDetails,
  setInitialLoad,
}) => {
  const [open, setOpen] = useState(false);

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      setSelectedTask(null);
      const res = await apiServer.get(`/task/${task.id}`);
      setSelectedTask(res.data);
      setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      setSelectedTask(null);
      const res = await apiServer.get(`/task/${task.id}`);
      setSelectedTask(res.data);
      setInitialLoad(false);
    }
  };

  const body = (
    <div className="modal-container">
      <TaskDetailsForm task={task} closeModal={closeModal} />
    </div>
  );

  return (
    <>
      <li className="task-task-item" onClick={setTaskPopOut}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {task.completed ? (
            <RiCheckboxCircleLine
              style={{ color: "green", fontSize: "16px" }}
            />
          ) : (
            <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
          )}
          <p
            style={{
              paddingLeft: "5px",
              color: "gray",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            {task.name}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={`task-project-home-name-container task-project-${task.Project.id}`}
          >
            <p
              style={{
                margin: "0px",
                padding: "5px",
                fontSize: "12px",
                fontWeight: "500",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {task.Project.name}
            </p>
          </div>
          <div
            style={{
              width: "73px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                color: "gray",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {date.format("MMM D YYYY")}
            </p>
          </div>
        </div>
      </li>
      {/* <Modal open={open} onClose={closeModal}>
        {body}
      </Modal> */}
    </>
  );
};

export default connect(null, { getSelectedTask })(TaskItemTask);
