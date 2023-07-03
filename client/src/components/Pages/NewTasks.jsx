import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_user_tasks } from "../../redux/actions/TaskActions";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import TaskItemTask from "../tasks/TaskItemTask";
import Add from "../../assets/Add";
import AddTaskPopOutTaskPage from "../PopOutMenu/AddTaskPopOutTaskPage";
import PopOutTaskDetails from "../PopOutMenu/PopOutTaskDetails";

const NewTasks = () => {
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [sideTaskForm, setSideTaskForm] = useState(false);
  const [sideTaskDetails, setSideTaskDetails] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.allTasks.tasks);

  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideTaskForm(!sideTaskForm);
  };

  const showSideTaskDetails = () => {
    setSideTaskForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getUserTasks = async () => {
      const id = localStorage.getItem("userId");
      await dispatch(get_user_tasks(id));
      setLoading(false);
    };

    getUserTasks();
  }, [dispatch]);

  const sortedTasks = tasks.sort(function (a, b) {
    return new Date(a.due_date) - new Date(b.due_date);
  });

  const renderedTasks = sortedTasks.map((task, i) => {
    return (
      <TaskItemTask
        task={task}
        key={i}
        showSideTaskDetails={showSideTaskDetails}
        sideTaskDetails={sideTaskDetails}
        setInitialLoad={setInitialLoad}
      />
    );
  });

  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        <div className="tasks-main-content">
          <div
            className={
              tasks.length > 0 || initialLoad
                ? "tasks-inner-container"
                : "tasks-inner-container hidden"
            }
          >
            <div
              className="tasks-add-task-container"
              onClick={showSideTaskForm}
            >
              <div className="tasks-add-task-icon">
                <Add />
              </div>
              <div className="add-task-button">
                <p style={{ margin: "2px 0px 0px 0px", paddingLeft: "5px" }}>
                  Add Task
                </p>
              </div>
            </div>
            {renderedTasks}
          </div>
          {sideTaskDetails ? (
            <PopOutTaskDetails
              showSideTaskDetails={showSideTaskDetails}
              sideTaskDetails={sideTaskDetails}
            />
          ) : null}
          {sideTaskForm ? (
            <AddTaskPopOutTaskPage
              showSideTaskForm={showSideTaskForm}
              title={"Add a Task"}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NewTasks;
