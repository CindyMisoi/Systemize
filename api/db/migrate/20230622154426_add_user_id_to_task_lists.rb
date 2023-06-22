class AddUserIdToTaskLists < ActiveRecord::Migration[7.0]
  def change
    add_column :task_lists, :user_id, :integer
  end
end
