import React, { useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "./TaskDetailsForm";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import Pin from "../../assets/pin";
import Comments from "../../assets/comments";
import UserAvatar from "../NavigationBar/UserAvatar";
import moment from "moment";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

const ColumnTaskItem = ({
  task,
  index,
  showSideTaskDetails,
  sideTaskDetails,
}) => {
  const [taskState, taskdispatch] = useContext(TaskContext);

  const date = task?.due_date? moment(
    task.due_date?.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  ): null;

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      //---
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
    } else {
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/tasks/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
    }
  };
  function getInitials(name) {
    // Split the name into individual words
    const words = name.trim().split(' ');
  
    // Extract the first letter from each word and convert to uppercase
    const initials = words.map(word => word.charAt(0).toUpperCase());
  
    // Join the initials together
    return initials.join('');
  }

  return (
    <div key={task.id}>
      <Draggable
        draggableId={`${task.id.toString()}`}
        type="task"
        key={`${task.id}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-project-item"
            // onClick={openTaskDetailFormModal}
            onClick={setTaskPopOut}
          >
            <div className="task-project-container-left">
              <div className="task-project-name">{task.name}</div>
              <div className="task-project-icons">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Pin />{" "}
                  <p style={{ color: "darkgray", marginLeft: "5px" }}>8</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Comments />{" "}
                  <p style={{ color: "darkgray", marginLeft: "5px" }}>9</p>
                </div>
              </div>
            </div>
            <div className="task-project-container-right">
              <div className="task-project-assignee-avatar">
                <div className="user-avatar">
                  {getInitials(task.user.name)}
                </div>
              </div>
              <div className="task-project-due_date">
                <p style={{ color: "darkgray" }}>{date?.format("MMM  D")}</p>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default ColumnTaskItem;
