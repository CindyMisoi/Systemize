class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :team_id

      t.timestamps
    end
  end
end
