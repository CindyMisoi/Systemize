import {ActionTypes} from '../constants/action-types';

const initialState = {
  teams: [],
}

export const teamsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.get_user_teams:
      return {...state, teams: payload};
      case ActionTypes.update_user_teams:
        return {...state, ...payload};
         case ActionTypes.team_create_request:
          return {...state};
          case ActionTypes.team_create_success:
           return {...state, teams: payload};
           case ActionTypes.team_create_failure:
            return {...state, ...payload};
            case ActionTypes.get_team_projects:
              return {...state, team: payload};
        default: return state;
  }
};

