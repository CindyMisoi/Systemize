class CommentsController < ApplicationController
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
end
