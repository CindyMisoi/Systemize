import { ActionTypes } from "../constants/action-types";

export const getUserProjects = (projects) => {
    return {
        type: ActionTypes.get_user_projects,
        payload: projects,
    };
};
export const updateUserProjects = (projects) => {
    return {
        type: ActionTypes.update_user_projects,
        payload: projects,
    };
};
export const getProject = (project) => {
    return { 
        type: ActionTypes.get_project,
        payload: project,
    };
};
export const getProjects = (projects) => {
    return { 
        type: ActionTypes.get_projects,
        payload: projects,
    };
};
export const updateProject = (project) => {
    return {
        type: ActionTypes.update_project,
        payload: project,
    };
};