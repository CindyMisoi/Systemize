class CommentsController < ApplicationController
    # error handling
    rescue_from ActiveRecord::RecordNotFound, with: :response_not_found
    before_action :set_comments, only: %i[show destroy]
    # get all comments
    def index
        comments = Comment.all
        render json: comments, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    # delete comment
    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        head :no_content
    end

    # private methods
    private
    def set_comments
        @comments = Comment.find(params[:id])
    end
    def response_not_found
        render json: {error: "Comment not found"}, status: :not_found
    end
end
