class Project < ApplicationRecord
    has_many :tasklists
    has_many :tasks
    has_many :user_projects
    has_many :users, through: :user_projects

    belongs_to :team
end
