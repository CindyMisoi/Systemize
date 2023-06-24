class UserTeamsController < ApplicationController
    # get all userteams
    def index
        userteams = UserTeam.all
        render json: userteams
    end
    # leave team
    def leave_team
        team = Team.find(params[:teamId])
        user = User.find(params[:userId])
        UserTeam.where(team: team, user: user).destroy_all
        if team.users.empty?
            team.destroy
        end
        render json: {message: "User removed from Team"}
    end

end
