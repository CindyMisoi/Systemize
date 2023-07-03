class SessionsController < ApplicationController

    #Login
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: { errors: "Invalid username or password" }, status: :unauthorized
        end
    end

    #Logout
    def destroy
        if session.present?
            session.delete(:user_id)
            head :no_content
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end
end
