class AddColumnTaskIndexToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks , :task_index, :integer
  end
end
