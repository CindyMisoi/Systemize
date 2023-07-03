export const ActionTypes = {
    // projects
    get_user_projects : "get_user_projects",
    update_user_projects: "update_user_projects",
    get_project: "get_project",
    get_projects: "get_projects",
    update_project: "update_project",

    // tasklists
    get_project_tasklists: "get_project_tasklists",
    update_project_tasklists: "update_project_tasklists",
    get_selected_tasklist: "get_selected_tasklist",

    // tasks
    get_tasks: "get_tasks",
    get_user_tasks: "get_user_tasks",
    update_task: "update_task",
    get_selected_task: "get_selected_task",
    delete_task: "delete_task",

    // team
    get_user_teams: "get_user_teams",
    get_team_projects: "get_team_projects",
    update_user_teams: "update_user_teams",
    team_create_request: "team_create_request",
    team_create_success: "team_create_success",
    team_create_failure: "team_create_failure",

    // user
    get_user_info: "get_user_info",
    LOGOUT: "LOGOUT",

    // comments
    add_comment: "add_comment",
}