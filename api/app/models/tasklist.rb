class Tasklist < ApplicationRecord
    belongs_to :project
    belongs_to :user
    has_many :tasks

    before_create :increment_column_index

    private
    def increment_column_index
        last_column_index = Tasklist.order(column_index: :desc).first
        if last_column_index
            self.column_index = last_column_index.column_index + 1
        else
            self.column_index = 1
        end
    end
end
