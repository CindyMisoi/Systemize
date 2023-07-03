import { ActionTypes } from "../constants/action-types";

export const addComment = (comments) => {
    return {
        type: ActionTypes.add_comment,
        payload: comments,
    };
};
