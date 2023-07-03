import {ActionTypes} from '../constants/action-types';

const initialState = {
  projects: [],
};

export const projectsReducer = (state = initialState, {type, payload}) => {
  switch (type){
    case ActionTypes.get_user_projects:
      return {...state, projects: payload };
      case ActionTypes.update_user_projects:
        return {...state, ...payload };
        case ActionTypes.get_projects:
          return {...state, projects: payload};
        default: return state;
  }
};

export const projectReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.get_project:
      return {...state, ...payload};
      case ActionTypes.update_project:
        return {...state, ...payload};
        default: return state;
  }
};