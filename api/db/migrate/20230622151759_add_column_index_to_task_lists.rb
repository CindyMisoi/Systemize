class AddColumnIndexToTaskLists < ActiveRecord::Migration[7.0]
  def change
    add_column :task_lists, :column_index, :integer
  end
end
