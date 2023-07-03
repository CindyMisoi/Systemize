import {combineReducers} from 'redux';
import {projectsReducer, projectReducer } from './ProjectReducer';
import { tasklistsReducer, selectedTasklistReducer } from './TasklistReducer';
import {tasksReducer, taskReducer} from './TaskReducer';
import { teamsReducer } from './TeamReducer';
import { userReducer } from './UserReducer';
import { authReducer} from './authReducer';
import { commentsReducer } from './CommentReducer';
const reducers = combineReducers({
    allProjects: projectsReducer,
    project: projectReducer,
    allTasklists: tasklistsReducer,
    tasklist: selectedTasklistReducer,
    allTasks: tasksReducer,
    task: taskReducer,
    allTeams: teamsReducer,
    user: userReducer,
    auth: authReducer,
    comments: commentsReducer,
});
export default reducers;