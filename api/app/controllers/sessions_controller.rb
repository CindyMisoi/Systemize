class SessionsController < ApplicationController
     # handle login
     def create
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            redirect_to root_path, 
            notice: "Logged in successfully!"
            render json: user, status: :created
        else
            render json: {error: "Invalid email or password"}, status: 401
        end
    end

    # handle logout
    def destroy
        if session.present?
            session.delete(:user_id)
            head :no_content
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end
end
