import React, { useState } from "react";
import { connect } from "react-redux"; // Import connect from react-redux
import { BiRightArrow } from "react-icons/bi";
import TaskItemTask from "./TaskItemTask";
import "../../css/Task.css";

const TaskSection = ({ title, tasks }) => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
    let arrow = document.getElementById(`task-collapse-${title}`);
    arrow.classList.toggle("open-arrow-collapse");
    arrow.classList.toggle("open-arrow");
  };

  const taskList = tasks.map((task, i) => {
    return <TaskItemTask task={task} key={i} />;
  });

  return (
    <div className="task-section">
      <div className="task-section-header" onClick={toggle}>
        <div id={`task-collapse-${title}`} className="open-arrow">
          <BiRightArrow />
        </div>
        <h3 className="task-section-title">{title}</h3>
      </div>
      {open && <div className="task-section-list"> {taskList}</div>}
    </div>
  );
};

export default TaskSection;
