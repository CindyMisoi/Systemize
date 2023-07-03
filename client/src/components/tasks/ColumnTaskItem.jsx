import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "./TaskDetailsForm";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import Pin from "../../assets/pin";
import Comments from "../../assets/comments";
import UserAvatar from "../NavigationBar/UserAvatar";
import moment from "moment";
import apiServer from "../../config/apiServer";
import {
  getSelectedTask,
  toggleSideTaskDetails,
} from "../../redux/actions/TaskActions";

const ColumnTaskItem = ({
  task,
  index,
  showSideTaskDetails,
  sideTaskDetails,
  getSelectedTask,
  toggleSideTaskDetails,
}) => {
  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      toggleSideTaskDetails();
      //---
      getSelectedTask(null);
      const res = await apiServer.get(`/tasks/${task.id}`);
      getSelectedTask(res.data);
    } else {
      getSelectedTask(null);
      const res = await apiServer.get(`/tasks/${task.id}`);
      getSelectedTask(res.data);
    }
  };

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
                  {(task.User.name[0] + task.User.name[1]).toUpperCase()}
                </div>
              </div>
              <div className="task-project-due_date">
                <p style={{ color: "darkgray" }}>{date.format("MMM D")}</p>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sideTaskDetails: state.task.sideTaskDetails,
});

export default connect(mapStateToProps, {
  getSelectedTask,
  toggleSideTaskDetails,
})(ColumnTaskItem);
