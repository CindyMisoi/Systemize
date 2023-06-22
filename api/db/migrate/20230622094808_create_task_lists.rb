class CreateTaskLists < ActiveRecord::Migration[7.0]
  def change
    create_table :task_lists do |t|
      t.string :name
      t.integer :project_id
      t.integer :user_id

      t.timestamps
    end
  end
end
