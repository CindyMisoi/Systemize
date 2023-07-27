import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListForm from "../Forms/TaskListForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PopOutTaskDetails from "../PopOutMenu/PopOutTaskDetails";
import AddTasklistPopOut from "../PopOutMenu/AddTasklistPopOut";
import AddTaskPopOutProjectPage from "../PopOutMenu/AddTaskPopOutProjectPage";
import { Context as TaskContext } from "../../context/store/TaskStore";

import "../../css/Project.css";
import "../../css/TaskList.css";
import ColumnTasklist from "../tasks/ColumnTasklist";
import Add from "../../assets/Add";

const ProjectPage = ({ sidebar }) => {
  const { projectId, teamId, projectName} = useParams();
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [openTasklistForm, setOpenTasklistForm] = useState(false);
  const [tasks, setTasks] = useState();
  const [project, setProject] = useState([]);
  const [tasklists, setTasklists] = useState([]);

  //Side Menus
  const [sideTaskForm, setSideTaskForm] = useState(false);
  const [sideTasklistForm, setSideTasklistForm] = useState(false);
  const [sideTaskDetails, setSideTaskDetails] = useState(false);

  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideTasklistForm(false);
    setSideTaskForm(!sideTaskForm);
  };

  const showSideTasklistForm = () => {
    setSideTaskDetails(false);
    setSideTaskForm(false);
    setSideTasklistForm(!sideTasklistForm);
  };

  const showSideTaskDetails = () => {
    setSideTasklistForm(false);
    setSideTaskForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  //Task through get /projects/id/taskslists. Set here so we can refer to it in the ondragend funnction
  const [loading, setLoading] = useState(true);

  const openTasklistFormModal = () => {
    setOpenTasklistForm(true);
  };

  const closeTasklistFormModal = () => {
    setOpenTasklistForm(false);
  };

const reorderTasklists = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  // Check if the tasklist is already at the first position
  if (startIndex !== 0 && endIndex === 0) {
    // If not, remove the tasklist from its original position
    result.splice(startIndex, 1);
  } else {
    // If moving to the first position or staying at the first position, handle as before
    if (endIndex === 0) {
      result.forEach((tasklist) => {
        tasklist.column_index += 1;
      });
      removed.column_index = 0;
      result.unshift(removed);
    } else {
      result.splice(endIndex, 0, removed);
    }
  }

  return result;
};

  

const updateTasklist = async (newIndex, tasklistId) => {
  console.log("column Index updated: " + newIndex);
  await apiServer.put(`/tasklists/${tasklistId}/column_index`, { newIndex });
};

const onDragEnd = async (result) => {
  const { destination, source, draggableId, type } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (type === "column") {
    const startIndex = source.index;
    const endIndex = destination.index;

    if (startIndex === endIndex) {
      return;
    }

    const updatedTasklists = reorderTasklists(tasklists, startIndex, endIndex);
    setTasklists(updatedTasklists);

    // Update column_index for tasklists in the database
    updatedTasklists.map(async (list, index) => {
      await updateTasklist(index, list.id);
    });
  }

  if (type === "task") {
    const destinationTasklistId = destination.droppableId.split("-")[0];
    const destinationTaskIndex = destination.index;
    const sourceTasklistId = source.droppableId.split("-")[0];
    const sourceTaskIndex = source.index;

    // Ensure source and destination tasklist ids are defined
    if (!destinationTasklistId || !sourceTasklistId) {
      return;
    }

    // Update the tasklist of the dragged task in the database
    console.log("task is dragged");
    await apiServer.put(`/tasks/${draggableId}/tasklist`, {
      destinationTasklistId,
    });

    // Update the task_index of the dragged task in the database
    await apiServer.put(`/tasks/${draggableId}/task_index`, {
      destinationTaskIndex,
    });

    // Perform any other task updates or reordering if needed
    const updatedTasklists = [...tasklists];
    const sourceTasklist = updatedTasklists.find(
      (list) => list.id === sourceTasklistId
    );
    const destinationTasklist = updatedTasklists.find(
      (list) => list.id === destinationTasklistId
    );

    if (!sourceTasklist || !destinationTasklist) {
      return;
    }

    const [movedTask] = sourceTasklist.Tasks.splice(sourceTaskIndex, 1);
    destinationTasklist.Tasks.splice(destinationTaskIndex, 0, movedTask);

    setTasklists(updatedTasklists);
  }
};


  const getProject = async () => {
    try {
      const res = await apiServer.get(`/projects/${projectId}`);
      console.log("Project Data", res.data);
      setProject(res.data);
      console.log(res.data.tasklists);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching project data", err);
      setLoading(false);
    }
  };
  const getTasklists = async () => {
    try {
      const res = await apiServer.get(`/projects/${projectId}/tasklists`);
      console.log("Tasklist Data", res.data);
      setTasklists(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("UseEffect triggered");
    getProject();
    getTasklists();
    taskdispatch({ type: "get_selected_task", payload: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const renderedTasklists = tasklists.map((tasklist, index) => {
    return (
      <ColumnTasklist
        key={index}
        tasklist={tasklist}
        index={index}
        setTasklists={setTasklists}
        showSideTaskDetails={showSideTaskDetails}
        sideTaskDetails={sideTaskDetails}
        showSideTaskForm={showSideTaskForm}
      />
    );
  });
  if (loading) {
    return <Loader />;
  }
  
  return (
    // <div style={{ height: "inherit" }}>
    // <div style={{ height: "inherit" }}>
    <>
      <TopNavBar
        name={project.name}
        setTasklists={setTasklists}
        sidebar={sidebar}
      />
      <div className="project-page-container">
        <div className="project-page-main-content">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className="project-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {renderedTasklists}
                  {provided.placeholder}
                  <div
                    className="tasklist-new-tasklist--button"
                    // onClick={openTasklistFormModal}
                    onClick={showSideTasklistForm}
                  >
                    <div
                      style={{
                        display: "flex",
                        transform: "rotate(90deg)",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        marginTop: "50px",
                      }}
                    >
                      <Add /> Add Column
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {sideTaskDetails && taskState.selectedTask ? (
            <PopOutTaskDetails
              showSideTaskDetails={showSideTaskDetails}
              sideTaskDetails={sideTaskDetails}
            />
          ) : null}
          {sideTasklistForm ? (
            <AddTasklistPopOut
              showSideTasklistForm={showSideTasklistForm}
              title={"Add Tasklist"}
              setTasklists={setTasklists}
            />
          ) : null}
          {sideTaskForm ? (
            <AddTaskPopOutProjectPage
              showSideTaskForm={showSideTaskForm}
              title={"Add Task"}
              setTasklists={setTasklists}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
