class RemoveOwnerFromTaskLists < ActiveRecord::Migration[7.0]
  def change
    remove_column :task_lists, :owner_id, :integer
  end
end
