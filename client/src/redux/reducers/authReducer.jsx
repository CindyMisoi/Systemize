import { ActionTypes } from "../constants/action-types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // Handle other actions...

    default:
      return state;
  }
};

