class RenameTaskListId < ActiveRecord::Migration[7.0]
  def change
    rename_column :tasks , :taskList_id, :task_list_id
  end
end
