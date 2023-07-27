class AddAutoIncrementToColumnIndex < ActiveRecord::Migration[7.0]
  def up
    change_column :tasklists, :column_index, :integer, auto_increment: true
  end
end
