class CreateExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.float :points
      t.text :text

      t.timestamps
    end
  end
end
