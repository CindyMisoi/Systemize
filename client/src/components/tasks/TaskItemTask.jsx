import React, { useState, useContext } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "./TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

const TaskItemTask = ({
  task,
  showSideTaskDetails,
  sideTaskDetails,
  setInitialLoad,
}) => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [open, setOpen] = useState(false);

  console.log(task);
  const date = task?.due_date
    ? moment(task.due_date?.substring(0, 10).replace("-", ""), "YYYYMMDD")
    : null;

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
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
            <RiCheckboxCircleLine style={{ color: "green", fontSize: "16px" }} />
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
          {task.project ? (
            <div
              className={`task-project-home-name-container task-project-${task.project.id}`}
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
                {task.project.name}
              </p>
            </div>
          ) : (
            <div
              className={`task-project-home-name-container task-project-unknown`}
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
                No Project
              </p>
            </div>
          )}

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
              {date?.format("MMM D")}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default TaskItemTask;
