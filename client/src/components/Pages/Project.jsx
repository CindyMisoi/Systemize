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
  const { projectId, projectName, teamId } = useParams();
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [openTasklistForm, setOpenTasklistForm] = useState(false);
  const [tasks, setTasks] = useState();
  const [project, setProject] = useState();
  const [tasklists, setTasklists] = useState();

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

  //Task through get /project/id/taskslists. Set here so we can refer to it in the ondragend funnction
  const [loading, setLoading] = useState(true);

  const openTasklistFormModal = () => {
    setOpenTasklistForm(true);
  };

  const closeTasklistFormModal = () => {
    setOpenTasklistForm(false);
  };

  const onDragEnd = async (result) => {
    console.log(result, "result");
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
      const redorderedLists = reorderTasklists(
        tasklists,
        source.index,
        destination.index
      );

      setTasklists(redorderedLists);
      console.log(redorderedLists, "reordedLists");
      redorderedLists.map((list, index) => {
        return updateTasklist(index, list.id, list.column_index);
      });
    }

    if (type === "task") {
      updateTasks(source, destination, draggableId);
      const destinationTasklistId = destination.droppableId.split("-")[0];
      const destinationIndexId = destination.droppableId.split("-")[1];
      const sourceTasklistId = source.droppableId.split("-")[0];
      const sourceIndexId = source.droppableId.split("-")[1];
      const destinationTaskIndex = destination.index;
      const sourceTaskIndex = source.index;
    
      let sourceTasklist = tasklists[sourceIndexId].Tasks;
      //sets destination tasklist
      let destinationTasklist = tasklists[destinationIndexId].Tasks;

      reorderTasks(sourceTasklist, destinationTasklist, source, destination);

    }
  };

  const reorderTasklists = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderTasks = (sourceTasklist, destinationTasklist, source, destination) => {
    // Ensure sourceTasklist and destinationTasklist are valid arrays
    if (!Array.isArray(sourceTasklist)) {
      sourceTasklist = [];
    }
  
    if (!Array.isArray(destinationTasklist)) {
      destinationTasklist = [];
    }
  
    let sourceTask = sourceTasklist.splice(source.index, 1);
    destinationTasklist.splice(destination.index, 0, sourceTask[0]);
  };
  
  const updateTasklist = async (newIndex, tasklistId, column_index) => {
    await apiServer.put(`/tasklists/${tasklistId}/column_index/`, { newIndex });
  };

  const updateTasks = async (source, destination, draggableId) => {
    const sourceColumnId = source.droppableId;
    const destinationTasklistId = destination.droppableId.split("-")[0];
    const destinationIndexId = destination.droppableId.split("-")[1];
    const sourceTasklistId = source.droppableId.split("-")[0];
    const sourceIndexId = source.droppableId.split("-")[1];
    const taskId = draggableId;
    const updatedTasklist = await apiServer.put(`/tasks/${taskId}/tasklist`, {
      destinationTasklistId,
    }); // this will update the initial task with the new tasklist id
  
    // once that comes back, we want to update the task_index of that task to destination.index
    const destinationIndex = destination.index; // index of task in tasklist
    const updatedTaskIndex = await apiServer.put(`/tasks/${taskId}/task_index`, {
      destinationIndex,
    });
  
    // Once that comes back, we will update task_indexes for tasklists then re-render
    const updatedTasklists = tasklists.map((tasklist) => {
      if (tasklist.id === destinationTasklistId) {
        // Update the destination tasklist with the moved task
        tasklist.Tasks.splice(destinationIndex, 0, tasklist.Tasks.splice(source.index, 1)[0]);
      } else if (tasklist.id === sourceTasklistId) {
        // Update the source tasklist by removing the moved task
        tasklist.Tasks.splice(source.index, 1);
      }
      return tasklist;
    });
  
    setTasklists(updatedTasklists);
  };
  

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/projects/${projectId}`);
      // await getTasklists();
      const resp = await apiServer.get(`/projects/${projectId}/tasklists`);
      setProject(res.data);
      setTasklists(resp.data);
      // console.log(tasklists);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //NOTE: MAYBE TRY GRABBING TASKS IN ONE GET API CALL AND PUSHING IT DOWN?
  const getTasklists = async () => {
    try {
      const res = await apiServer.get(`/projects/${projectId}/tasklists`);
      setTasklists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
    taskdispatch({ type: "get_selected_task", payload: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProject, setTasklists, setTasks]);

  if (loading) {
    return <Loader />;
  }
  
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

  //----------------------------------------------Project
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
                  {/* {tasklists.map((tasklist, i) => {
                  return ( */}
                  {/* <TaskListItem
                      index={i}
                      teamId={teamId}
                      tasklist={tasklist}
                      key={tasklist.id}
                    /> */}

                  {/* );
                })} */}

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

      {/* </div> */}
      {/* <Modal open={openTasklistForm} onClose={closeTasklistFormModal}>
    //     {tasklistFormModal}
    //   </Modal> */}
      {/* // // </div> */}
    </>
  );
};

export default ProjectPage;
