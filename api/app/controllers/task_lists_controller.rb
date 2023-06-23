class TaskListsController < ApplicationController
    # get all tasklists
    def index
        tasklists = TaskList.all
        render json: tasklists, status: :ok
    end
    # get all tasks for a tasklist
    def get_tasks_for_tasklist
        tasklist = TaskList.find(params[:id])
        tasks = tasklist.tasks
        render json: tasks, status: :ok
    end
    # create task to tasklist
    def create_task
        tasklist = TaskList.find(params[:id])
        task = tasklist.tasks.create!(task_params)
        if(task.save)
            render json: task, status: :created
        else
            head :not_found
        end
    end
    # delete task list
    def destroy
        tasklist = TaskList.find(params[:id])
        tasklist.destroy
        head :no_content
    end

    #edit column_index
    def edit_columnIndex
        tasklist = TaskList.find(params[:id])
        if tasklist.update(column_index: params[:id])
            render json: tasklist.column_index
        else
            render json: {error: "something went wrong"}, status: :unprocessable_entity
        end
    end

    # update tasklist name
    def update_tasklist_name
        tasklist = TaskList.find(params[:id])
        if tasklist.update(name: params[:name])
            render json: tasklist
        else
            render json: {error: "tasklist name did not update"}, status: :unprocessable_entity
        end
    end


    # private methods
    private
    def task_params
        params.permit(:name, :project_id, :user_id, :due_date, :completed, :completed_at, :description).merge(task_list_id: params[:id])
    end

end
