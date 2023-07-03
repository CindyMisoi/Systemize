import {ActionTypes} from '../constants/action-types';

const initialState = {
  tasks: [],
}

export const tasksReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.get_user_tasks:
      return {...state, tasks: payload};
      case ActionTypes.get_tasks:
        return {...state, tasks: payload};
      default: return state;
  }
};

export const taskReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.update_task:
      return {...state, ...payload};
      case ActionTypes.get_selected_task:
        return {...state, ...payload};
        case ActionTypes.delete_task:
          return {};
        default: return state;
  }
}