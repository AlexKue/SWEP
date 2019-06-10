class AddTitleToExercise < ActiveRecord::Migration[5.2]
  def change
    add_column :exercises, :title, :string
  end
end
