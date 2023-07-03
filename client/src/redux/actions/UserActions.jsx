import { ActionTypes } from "../constants/action-types";

export const getUserInfo= (user) => {
    return {
        type: ActionTypes.get_user_info,
        payload: user,
    };
};