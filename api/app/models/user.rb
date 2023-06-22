class User < ApplicationRecord
    has_secure_password
    
    has_many :tasks
    has_many :task_lists
    has_many :comments
    has_many :user_teams
    has_many :teams, through: :user_teams
    has_many :user_projects
    has_many :projects, through: :user_projects
end
