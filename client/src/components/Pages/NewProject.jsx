import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProject,
  // updateTasklistColumnIndex,
  // updateTaskTasklist,
  // updateTaskIndex,
} from "../../redux/actions/ProjectActions";
import {
  // addTaskProject,
  // addTasklist,
  // getTasklistTasks,
} from "../../redux/actions/TaskActions";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListItem from "../tasks/TaskListItem";
import TaskListForm from "../Forms/TaskListForm";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";
import TaskDetailsForm from "../tasks/TaskDetailsForm";

import "../../css/Project.css";
import "../../css/TaskList.css";

const ProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const tasklists = useSelector((state) => state.project.tasklists);
  const loading = useSelector((state) => state.project.loading);
  const [openTasklistForm, setOpenTasklistForm] = useState(false);
  const [openTaskProjectForm, setOpenTaskProjectForm] = useState(false);
  const [openTaskDetailForm, setOpenTaskDetailForm] = useState(false);

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [dispatch, projectId]);

  const openTasklistFormModal = () => {
    setOpenTasklistForm(true);
  };

  const closeTasklistFormModal = () => {
    setOpenTasklistForm(false);
  };

  const openTaskDetailFormModal = () => {
    setOpenTaskDetailForm(true);
  };

  const closeTaskDetailFormModal = () => {
    setOpenTaskDetailForm(false);
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
      const reorderedLists = reorderTasklists(
        tasklists,
        source.index,
        destination.index
      );
      dispatch(updateTasklistColumnIndex(reorderedLists));
    }

    if (type === "task") {
      dispatch(updateTasks(source, destination, draggableId));
    }
  };

  const reorderTasklists = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderTasks = (
    sourceTasklist,
    destinationTasklist,
    source,
    destination
  ) => {
    const sourceTask = sourceTasklist.splice(source.index, 1);
    destinationTasklist.splice(destination.index, 0, sourceTask[0]);
  };

  const updateTasks = async (source, destination, draggableId) => {
    const taskId = draggableId;
    const sourceTasklistId = source.droppableId.split("-")[0];
    const destinationTasklistId = destination.droppableId.split("-")[0];
    const destinationIndex = destination.index;

    dispatch(updateTaskTasklist(taskId, destinationTasklistId));
    dispatch(updateTaskIndex(taskId, destinationIndex));

    if (source.droppableId === destination.droppableId) {
      const tasklist = tasklists.find(
        (tasklist) => tasklist._id === sourceTasklistId
      );
      const updatedTasklist = Array.from(tasklist.tasks);
      const [removed] = updatedTasklist.splice(source.index, 1);
      updatedTasklist.splice(destination.index, 0, removed);

      dispatch(getTasklistTasks(tasklist._id, updatedTasklist));
    } else {
      const sourceTasklist = tasklists.find(
        (tasklist) => tasklist._id === sourceTasklistId
      );
      const destinationTasklist = tasklists.find(
        (tasklist) => tasklist._id === destinationTasklistId
      );

      reorderTasks(sourceTasklist.tasks, destinationTasklist.tasks, source, destination);

      dispatch(getTasklistTasks(sourceTasklist._id, sourceTasklist.tasks));
      dispatch(getTasklistTasks(destinationTasklist._id, destinationTasklist.tasks));
    }
  };

  const handleAddTasklist = (tasklistData) => {
    dispatch(addTasklist(projectId, tasklistData));
    closeTasklistFormModal();
  };

  const handleAddTaskProject = (taskData) => {
    dispatch(addTaskProject(taskData));
    setOpenTaskProjectForm(false);
  };

  if (loading) {
    return <Loader />;
  }
    return (
      <div key={tasklist.id}>
        <Draggable
          type="tasklist"
          draggableId={`Column-${tasklist.column_index.toString()}`}
          index={index}
          key={`Column-${tasklist.id.toString()}`}
        >
          {(provided) => (
            <div
              className="tasklist-container"
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
            >
              <div className="tasklist-header">{tasklist.name}</div>
              <div className="tasklist-add-task--button"></div>
              <Droppable
                type="task"
                droppableId={`${tasklist.id.toString()}-${index.toString()}`}
              >
                {(provided) => (
                  <div
                    className="tasklist-task--list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasklist.Tasks.map((task, index) => {
                      return (
                        <div key={task.id}>
                          <Draggable
                            draggableId={`${task.id.toString()}`}
                            type="task"
                            key={`${task.id}`}
                            //this index needs to pull from tasksArray
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="task-project-item"
                                onClick={openTaskDetailFormModal}
                              >
                                {task.name}
                              </div>
                            )}
                          </Draggable>
                          <div>
                            <Modal
                              open={openTaskDetailForm}
                              onClose={closeTaskDetailFormModal}
                              style={{ backgroundColor: "white" }}
                            >
                              <div className="modal-container">
                                <TaskDetailsForm
                                  // setTasks={setTasks}
                                  setTasklistTasks={setTasklistTasks}
                                  task={task}
                                  closeModal={closeTaskDetailFormModal}
                                />
                              </div>
                            </Modal>
                          </div>
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div
                className="tasklist-new-task--button"
                onClick={openTaskProjectFormModal}
              >
                + Add task
              </div>
            </div>
          )}
        </Draggable>
        <div>
          <Modal
            className="modal"
            style={{ backgroundColor: "white" }}
            open={openTaskProjectForm}
            onClose={closeTaskProjectFormModal}
          >
            <div className="modal-container">
              <AddTaskProjectForm
                setTasklists={setTasklists}
                setTasklistTasks={setTasklistTasks}
                tasklistId={tasklist.id}
                projectId={tasklist.project_id}
                clickClose={closeTaskProjectFormModal}
                open={openTaskProjectForm}
              ></AddTaskProjectForm>
            </div>
          </Modal>
        </div>
      </div>
    );
  };

 export default ProjectPage;