class Task < ApplicationRecord
    belongs_to :task_list
    belongs_to :user
    belongs_to :project

    has_many :comments
end
