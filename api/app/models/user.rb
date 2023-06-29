class User < ApplicationRecord
    has_secure_password
    # validations
    validates :name, presence: true
    validates :email, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP}
    validates :password_digest, presence: true, length: {minimum: 6}
    # validates :password_confirmation, length: {minimum: 8}

    
    has_many :tasks
    has_many :task_lists
    has_many :comments
    has_many :user_teams
    has_many :teams, through: :user_teams
    has_many :user_projects
    has_many :projects, through: :user_projects
end
