class TasksController < ApplicationController
    # get all tasks
    def index
        tasks = Task.all
        render json: tasks, include: :project, status: :ok
    end
    # get individual tasks
    def show
        task = Task.includes(:project, :user, comments: :user).find(params[:id])
        render json: task, include: {project:{include:{users:{only:[:id,:name,:email,:image]}}}}, users:{only:[:id,:name,:email,:image]}, comments:{include:{user:{only:[:id,:name,:email,:image]}}}
    end
    # get tasks for a user
    def get_tasks_for_user
        user = User.find(params[:id])
        tasks = user.tasks
        render json: tasks, status: :ok
    end
    # create comment for a task
    def create_comment_for_task
        task = Task.find(params[:id])
        comment = task.comments.build(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: {error: "Failed to create comment"}, status: :unprocessable_entity
        end
    end
    # get all comments for a task
    def get_comments_for_task
        task = Task.find(params[:id])
        comments = task.comments.includes(:user).order(id: :asc)
        render json: comments, include: {user:{only:[:id,:name,:email, :image]}}, status: :ok
    end
    # update task
    def update
        task = Task.find(params[:id])
        if task.update(task_params)
            render json: task, status: :ok
        else
            render json: {error: "Failed to update task"}, status: :unprocessable_entity
        end
    end
    # update tasklists
    def update_tasklist
        task = Task.find(params[:id])
        task.update(tasklist_id: params[:tasklist_id])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update task"}, status: :unprocessable_entity
    end
    # update project
    def update_project
        task = Task.find(params[:id])
        task.update(project_id: params[:project_id])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update project"}, status: :unprocessable_entity
    end
    # update user
    def update_user
        task = Task.find(params[:id])
        task.update(user_id: params[:user_id])
        render json: task
        rescue
            StandardError
            render json: {error: "Failed to update user"}, status: :unprocessable_entity
    end
    # update due date
    def update_due_date
        task = Task.find(params[:id])
        task.update(due_date: params[:due_date])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update due date"}, status: :unprocessable_entity
    end
    # update description
    def update_description
        task = Task.find(params[:id])
        task.update(description: params[:description])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update description"}, status: :unprocessable_entity
    end
    # update complete
    def update_completed
        task = Task.find(params[:id])
        task.update(completed: params[:completed])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update completed"}, status: :unprocessable_entity
    end
    # update taskindex
    def update_taskIndex
        task = Task.find(params[:id])
        task.update(task_index: params[:task_index])
        render json: task
    rescue
        StandardError
        render json: {error: "Failed to update task index"}, status: :unprocessable_entity
    end

    # destroy task
    def destroy
        task = Task.find(params[:id])
        task.destroy
        head :no_content
    end

    # private methods
    private
    def comment_params
        params.permit(:text, :user_id)
    end
    def task_params
        params.permit(:name, :user_id, :due_date, :completed, :description)
      end
end
