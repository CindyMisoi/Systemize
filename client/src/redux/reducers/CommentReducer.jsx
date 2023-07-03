import {ActionTypes} from '../constants/action-types';

const initialState = {
  projecommentscts: [],
};

export const commentsReducer = (state = initialState, {type, payload}) => {
  switch (type){
    case ActionTypes.add_comment:
      return {...state, ...payload};
        default: return state;
  }
};
