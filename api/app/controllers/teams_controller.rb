class TeamsController < ApplicationController
    # rescue
rescue_from ActiveRecord::RecordNotFound, with: :response_not_found
    # get all teams
    def index
        teams = Team.all
        render json: teams, status: :ok
    end
    def show
        team = Team.includes(:projects, :users).find(params[:id])
        render json: team, include: {projects:{}, users:{only:[:id,:name,:email]}}, status: :ok
    end
    # get all users in a team
    def get_team_users
        team = Team.includes(:users).find(params[:id])
        users = team.users.select(:id, :name, :email)
        render json: users, status: :ok
    end
    # get all teams for a user
    def get_teams_user
        user = User.find(params[:id])
        teams = user.teams.select(:name, :id)
        render json: teams, status: :ok
    end
    # get all projects for a team
    def get_team_projects
        team = Team.includes(:projects).find(params[:id])
        projects = team.projects.select(:id,:name)
        render json: projects, status: :ok
    end
    # create team
    def create_team
        user_id = params[:userId]
        name = params[:name]
        description = params[:description]
        team = Team.new(name: name)
        team.description = description
        if description.present?
            if team.save
                UserTeam.create(user_id: user_id, team_id: team.id)
                render json: team, status: :created
            else
                render json: {error: "Failed to create team"}, status: :unprocessable_entity
            end
        end
    end
    # add other users to team
    def add_user_to_team
        team_id = params[:teamId]
        user_id = params[:userId]
        userteam = UserTeam.find_by(team_id: team_id, user_id: user_id)
        if userteam.present?
            render json: {error: "User already added to team"}, status: :conflict
        else
            new_user_team = UserTeam.create(user_id: user_id, team_id: team_id)
            render json: new_user_team, status: :created
        end
    end
    # edit team description
    def update_description
        team_id = params[:teamId]
        description = params[:description]
        team = Team.find_by(id: team_id)
        if team
            team.update(description: description)
            head :no_content
        end
    end
    # create project for team
    def create_project_for_team
        team_id = params[:id]
        name = params[:name]
        user_id = params[:userId]
        team = Team.find_by(id: team_id)
        if team
            project = team.projects.create(name: name)
            user_project = project.user_projects.create(user_id: user_id)
            render json: user_project, status: :created
        end
    end

    # delete team
    def destroy
        team = Team.find(params[:id])
        team.destroy
        head :no_content
    end
    # private methods
    private
    def response_not_found
        render json: {error: "Team not found"}, status: :not_found
    end
end
