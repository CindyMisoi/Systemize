import { ActionTypes } from "../constants/action-types";
const initialState = {
  tasklists: [],
}

export const tasklistsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.get_project_tasklists:
      return {...state, tasklists: payload};
      case ActionTypes.update_project_tasklists:
        return {...state, ...payload};
        default: return state;
  }
};

export const selectedTasklistReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.get_selected_tasklist:
      return {...state, ...payload};
  }
};