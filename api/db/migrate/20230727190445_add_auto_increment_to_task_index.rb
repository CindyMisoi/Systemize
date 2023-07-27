class AddAutoIncrementToTaskIndex < ActiveRecord::Migration[7.0]
  def up
    change_column :tasks, :task_index, :integer, auto_increment: true
  end
end
