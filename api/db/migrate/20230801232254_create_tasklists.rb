class CreateTasklists < ActiveRecord::Migration[7.0]
  def change
    create_table :tasklists do |t|
      t.string :name
      t.integer :project_id
      t.integer :user_id
      t.integer :column_index
      t.timestamps
    end
  end
end
