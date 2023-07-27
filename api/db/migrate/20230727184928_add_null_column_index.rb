class AddNullColumnIndex < ActiveRecord::Migration[7.0]
  def up
    change_column :tasklists, :column_index, :integer, default: 0
  end
end
