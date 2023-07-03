import {ActionTypes} from '../constants/action-types';

const initialState = {
    users: [],
}

export const userReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.get_user_info:
            return {...state, user: payload}
    }
};