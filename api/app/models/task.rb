class Task < ApplicationRecord
    belongs_to :tasklist
    belongs_to :user
    belongs_to :project

    has_many :comments
end
