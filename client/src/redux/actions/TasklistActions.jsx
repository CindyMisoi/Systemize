import { ActionTypes } from "../constants/action-types";

export const getProjectTasklists = (tasklists) => {
    return {
        type: ActionTypes.get_project_tasklists,
        payload: tasklists,
    };
};
export const updateProjectTasklists = (tasklists) => {
    return {
        type: ActionTypes.update_project_tasklists,
        payload: tasklists,
    };
};
export const getSelectedTasklist = (tasklist) => {
    return { 
        type: ActionTypes.get_selected_tasklist,
        payload: tasklist,
    };
};