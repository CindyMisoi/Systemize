class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :taskList_id
      t.integer :user_id
      t.integer :project_id
      t.string :description
      t.date :due_date
      t.boolean :completed
      t.date :completed_at

      t.timestamps
    end
  end
end
