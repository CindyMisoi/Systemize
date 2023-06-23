class CommentsController < ApplicationController
    # error handling
rescue_from ActiveRecord::RecordNotFound, with: :response_not_found
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
    def response_not_found
        render json: {error: "Comment not found"}, status: :not_found
    end
end
