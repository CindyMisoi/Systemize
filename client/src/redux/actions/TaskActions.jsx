import { ActionTypes } from "../constants/action-types";

export const getTasks = (tasks) => {
    return {
        type: ActionTypes.get_tasks,
        payload: tasks,
    };
};

export const getUserTasks = (tasks) => {
    return {
        type: ActionTypes.get_user_tasks,
        payload: tasks,
    };
};
export const updateTask = (task) => {
    return {
        type: ActionTypes.update_task,
        payload: task,
    };
};
export const getSelectedTask = (task) => {
    return { 
        type: ActionTypes.get_selected_task,
        payload: task,
    };
};
 export const deleteTask = (task) => {
    return { 
        type: ActionTypes.delete_task,
        };
};