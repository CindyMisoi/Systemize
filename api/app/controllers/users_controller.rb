class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
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

    #POST /users
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
    def register_onboard
        user = User.find_by(email: params[:email])
      
        if user.nil?
          render json: { errors: ['User not found'] }, status: :not_found
          return
        end
      
        team = Team.new(name: params[:name])
      
        if team.save
          UserTeam.create(user_id: user.id, team_id: team.id)
          render json: { message: 'Onboard information saved successfully' }, status: :ok
        else
          render json: { errors: team.errors.full_messages }, status: :unprocessable_entity
        end
    end
      

    # private methods
    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @user = User.find(params[:id])
      end
    # Only allow a list of trusted parameters through.
    def user_params
        params.permit(:name, :email, :password)
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
