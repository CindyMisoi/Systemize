class TasklistsController < ApplicationController
    # get all Tasklists
    def index
        tasklists = Tasklist.all
        render json: tasklists, status: :ok
    end
    # get all tasks for a Tasklist
    def get_tasks_for_Tasklist
        tasklist = Tasklist.find(params[:id])
        tasks = tasklist.tasks
        render json: tasks, status: :ok
    end
    # create task to Tasklist
    def create_task
        tasklist = Tasklist.find(params[:id])
        task = tasklist.tasks.new(task_params)

        if task.user.nil? || task.project.nil?
            render json: {error: "User or Project not found"}, status: :unprocessable_entity
            return
        end

        if task.save
            render json: task, status: :created
        else
            render json: {error: "Task not created"}, status: :unprocessable_entity
        end
    end
    # delete task list
    def destroy
        tasklist = Tasklist.find(params[:id])
        tasklist.destroy
        head :no_content
    end

    #edit column_index
    def edit_columnIndex
        tasklist = Tasklist.find(params[:id])
        if tasklist.update(column_index: params[:id])
            render json: Tasklist.column_index
        else
            render json: {error: "something went wrong"}, status: :unprocessable_entity
        end
    end

    # update Tasklist name
    def update_Tasklist_name
        tasklist = Tasklist.find(params[:id])
        if tasklist.update(name: params[:name])
            render json: Tasklist
        else
            render json: {error: "Tasklist name did not update"}, status: :unprocessable_entity
        end
    end


    # private methods
    private
    def task_params
        params.permit(:name, :user_id, :project_id, :due_date, :completed, :description).merge(tasklist_id: params[:tasklist_id])
      end
      
    

end

