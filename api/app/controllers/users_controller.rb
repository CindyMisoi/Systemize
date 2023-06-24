class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    before_action :validate_team_name, only: [:register_onboard]
    # get all users
    def index
        users = User.all
        render json: users, status: :ok
    end
    # get logged in /users/:id
    # handles auto login
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Unauthorized"}, status: 401
        end
    end

    # signup / register users
    def create
        if user_params[:password] == user_params[:password_confirmation]
            user = User.create(user_params)
            session[:user_id] = user.id
            render json: user, status: :created
        end
    end

    # onboard
    def register_onboard
        validator_err = validate_team_name
        if validate_err.present?
            errors = validator_err.map{|error| error[:msg]}
            render json: ["ERRORS", *errors]
            return
        end
        email = params[:email]
        team_name = Team.find_by(name: params[:name])
        user = User.find_by(email: email)
        if user.nil?
            render json: {error: "User not found"}, status: :not_found
        end
        team = Team.create(name: name)
        userteam = UserTeam.create(user_id: user.id, team_id: team.id)
        render json: {success: true}
    end

    # private methods
    private
    # register onboard
    def validate_team_name
        validation_errors = []
        validation_errors << {msg:"You\'ll need to enter a name"}
        if params[:team_name].blank?
            validation_errors
        end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @user = User.find(params[:id])
      end
    # Only allow a list of trusted parameters through.
    def user_params
        params.permit(:name, :email, :password, :password_confirmation, :image)
      end
  
      # render error for not found
      def not_found
        render json: { message: 'User not found'}, status: 404
      end
  
      # render error for invalid parameters / unprocessable entities
      def render_validation_errors(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: 422
      end
end
