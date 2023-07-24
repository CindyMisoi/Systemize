class ChangeTaskListsToTasklists < ActiveRecord::Migration[7.0]
  def change
    rename_table :task_lists, :tasklists
  end
end
