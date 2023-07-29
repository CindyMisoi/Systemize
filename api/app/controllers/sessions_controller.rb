class SessionsController < ApplicationController

    # Login
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        session_token = generate_session_token(user) # Generate session token
        session[:user_id] = user.id
        user.update(session_token: session_token) # Save session token for the user in your database or other secure storage
        render json: user, status: :ok
      else
        render json: { errors: "Invalid username or password" }, status: :unauthorized
      end
    end
  
    # Logout
    def destroy
      if current_user
        current_user.update(session_token: nil) # Clear session token for the user
        session.delete(:user_id)
        head :no_content
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    private
  
    def generate_session_token(user)
      token = SecureRandom.hex(32)
      "#{user.id}:#{token}"
    end
  
    def current_user
      @current_user ||= begin
        user_id, session_token = session[:user_id]&.split(':')
        User.find_by(id: user_id, session_token: session_token)
      end
    end
  
  end
  