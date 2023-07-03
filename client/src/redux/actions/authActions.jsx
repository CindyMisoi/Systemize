import { ActionTypes } from "../constants/action-types";

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};
