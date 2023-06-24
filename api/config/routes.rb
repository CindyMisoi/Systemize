Rails.application.routes.draw do

  # Authenticates user before being able to use API

  # comments
  # get all comments, delete comment
  resources :comments, only: [:index, :show, :destroy]


  # projects
  # get all projects, delete project
  resources :projects, only: [:index, :show, :destroy]
  # get all projects for a team user is on
  get 'projects/user/:id', to: 'projects#get_team_projects'
  # get all users in a project
  get 'projects/:id/users', to: 'projects#get_users_in_project'
  # get all tasklists for a project
  get 'projects/:id/tasklists', to: 'projects#get_tasklists_for_project'
  # get team project is on
  get 'projects/:id/team', to: 'projects#get_team'
  # create tasklist for a project
  post 'projects/:id/tasklist', to: 'projects#create_tasklist'

  # tasklists
  # get all tasklists 
  resources :task_lists, only: [:index, :destroy]
  # get all tasks for a tasklist
  get 'task_lists/:id/tasks', to: 'task_lists#get_tasks_for_tasklist'
  # create task for a tasklist
  post 'task_lists/:id/task', to: 'task_lists#create_task'
  # edit column index
  put 'task_lists/:id/column_index', to: 'task_lists#edit_columnIndex'
  # update tasklist name
  put 'task_lists/:id/title', to: 'task_lists#update_tasklist_name'

  # tasks
  # get all tasks
  resources :tasks, only: [:index, :update, :show, :destroy]
  # get all tasks for a user
  get 'tasks/user/:id', to: 'tasks#get_tasks_for_user'
  # create a comment for a task
  post 'tasks/:id/comment', to: 'tasks#create_comment_for_task'
  # get all comments for a task
  get 'tasks/:id/comment', to: 'tasks#get_comments_for_task'
  # update tasklist
  put 'tasks/:id/tasklist', to: 'tasks#update_tasklist'
  # update project
  put 'tasks/:id/project/:projectId', to: 'tasks#update_project'
  # update asignee or user
  put 'tasks/:id/user/:userId', to: 'tasks#update_user'
  # update due date
  put 'tasks/:id/due_date', to: 'tasks#update_due_date'
  # update description
  put '/:id/description', to: 'tasks#update_description'
  # update completed
  put 'tasks/:id/completed', to: 'tasks#update_completed'
  # update task index
  put 'tasks/:id/task_index', to: 'tasks#update_taskIndex'

  # teams
  # get all teams
  resources :teams, only: [:index, :show, :destroy]

  # get all users in a team
  get 'teams/:id/users', to: 'teams#get_team_users'
  # get all teams for a user
  get 'teams/user/:id', to: 'teams#get_teams_user'
  # get all projects for a team
  get 'teams/:id/projects', to: 'teams#get_team_projects'
  # create team
  post '/teams/user/:userId', to: 'teams#create_team'
  # add other users to a team
  post 'teams/:teamId/user/:userId', to: 'teams#add_user_to_team'
  # edit team description
  put 'teams/:teamId/description', to: 'teams#update_description'
  # create project for team
  post 'teams/:id/project', to: 'teams#create_project_for_team'


  # user_teams
  # leave team
  delete '/:teamId/user/:userId', to: 'user_teams#leave_team'
  # get all userTeams
  resources :user_teams, only: [:index]

  # users, login and sign up
  # get users, update, delete
  resources :users, only: [:index, :update, :destroy, :show]
  # register
  post '/register', to: 'users#create'
  # onboard info after registration
  put '/register/onboard', to: 'users#register_onboard'
  # login
  post '/login', to: 'sessions#create'
  # logout
  delete '/logout', to: 'sessions#destroy'









  


  















end
