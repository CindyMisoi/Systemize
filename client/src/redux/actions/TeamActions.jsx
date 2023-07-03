import { ActionTypes } from "../constants/action-types";

export const getUserTeams= (teams) => {
    return {
        type: ActionTypes.get_user_tasks,
        payload: teams,
    };
};
export const updateUserTeams = (teams) => {
    return {
        type: ActionTypes.update_task,
        payload: teams,
    };
};
export const getTeamProjects = (team) => {
  return {
      type: ActionTypes.get_team_projects,
      payload: team,
  };
};

export const createTeam = (teamData) => async (dispatch) => {
  try {
    dispatch({ type: team_create_request });

    const res = await apiServer.post("/teams", teamData);

    dispatch({ type: team_create_success, payload: res.data });
  } catch (error) {
    dispatch({ type: team_create_failure, payload: error.message });
  }
};
