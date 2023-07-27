class AddNullTaskIndex < ActiveRecord::Migration[7.0]
  def up
    change_column :tasks, :task_index, :integer, default: 0
  end
end
