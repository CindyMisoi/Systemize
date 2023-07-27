class Task < ApplicationRecord
    belongs_to :tasklist
    belongs_to :user
    belongs_to :project

    has_many :comments

    before_create :increment_task_index

    private
    def increment_task_index
        last_task_index = Task.order(task_index: :desc).first
        if last_task_index
            self.task_index = last_task_index.task_index + 1
        else
            self.task_index = 1
        end
    end
end
