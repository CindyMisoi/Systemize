import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {  deleteTask, updateTask } from "../../redux/actions/TaskActions";
import {addComment} from "../../redux/actions/CommentActions";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCheck } from "react-icons/bi";

const PopOutTaskDetails = ({
  showSideTaskDetails,
  task,
  toggleTaskStatus,
  deleteTask,
  updateTask
}) => {
  const [teamDescription, setTeamDescription] = useState(task.description);
  const [projectUsers, setProjectUsers] = useState(task.Project.Users);
  const [assigneeUser, setAssigneeUser] = useState(task.User);
  const [taskComments, setTaskComments] = useState(task.Comments);
  const [dueDate, setDueDate] = useState(new Date(task.due_date));
  const [setCompleted] = useState(task.completed);
  const [commentBox, setCommentBox] = useState(false);

  var completed = task.completed;

  const { clearErrors } = useForm();


  const updateProject = async () => {
    var projectId = document.getElementById("project-select").value;
    const userId = localStorage.getItem("userId");
    console.log(projectId);
    await apiServer.put(`/tasks/${task.id}/project/${projectId}`);
    const res = await apiServer.get(`/tasks/user/${userId}`);
    // Dispatch action to update task details in Redux store
    updateTask(res.data);
  };



  const updateDescription = async (e) => {
    const description = e.target.value;
    await apiServer.put(`/tasks/${task.id}/description`, { description });

    console.log(e.target.value);
  };






  return (
    <>
      <div className="PopOutTaskDetails">
        {/* Rest of the component JSX */}
      </div>
    </>
  );
};

const mapDispatchToProps = {
  // toggleTaskStatus,
  deleteTask,
  addComment,
  updateTask
};

export default connect(null, mapDispatchToProps)(PopOutTaskDetails);
