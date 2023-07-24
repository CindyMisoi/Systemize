class RenameTasklistIdColumnInTasks < ActiveRecord::Migration[7.0]
  def change
    rename_column :tasks, :task_list_id, :tasklist_id
  end
end
