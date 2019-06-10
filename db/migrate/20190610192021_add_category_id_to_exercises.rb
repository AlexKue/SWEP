class AddCategoryIdToExercises < ActiveRecord::Migration[5.2]
  def change
    add_reference :exercises, :category, foreign_key: true
  end
end
