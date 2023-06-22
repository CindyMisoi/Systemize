class ProjectsController < ApplicationController
    skip_before_action :verify_authenticity_token
    # get all projects
    def index
        projects = Project.all
        render json: projects, status: :ok
    end
    # get one project
    def show
        project = Project.find(params[:id])
        render json: project, status: :ok
    end
    
    # get all projects for teams that a user is on
    def get_team_projects
        user_id = params[:id]
        teams = Team.includes(:users, :projects)
        .where(users: {id: user_id})
        # pulls all projects from the teams and combines it into an array
        combined_projects = teams.flat_map { |team| team.projects }
        # sorts by created date
        sorted_projects = combined_projects.sort_by { |project| project.created_at }
        render json: sorted_projects, status: :ok
    end

    # get all users in a project
    def get_users_in_project
        project_id = params[:id]
        users = User.joins(:projects)
        .where(projects: {id: project_id})
        .select("users.id", "users.name")
        render json: users, status: :ok
    end
    def get_tasklists_for_project
        project_id = params[:id]
        tasklists = TaskList.where(project_id: project_id)
        .order(column_index: :asc)
        .includes(:tasks)  
     if tasklists.empty?
        render json: { message:'error'}
     else
        render json: tasklists
     end
    end
    # get team project is on
    def get_team
        project_id = params[:id]
        team = Team.includes(:projects, :users)
        .find_by(projects: {id: project_id})
        render json: team, status: :ok
    end

    # post task list for a project
    def create_tasklist
        project = Project.find(params[:id])
        tasklist = project.task_lists.create(tasklist_params)
        render json: tasklist, status: :created
    end

    # private methods
    private
    def tasklist_params
        params.permit(:name, :user_id)
    end
end
