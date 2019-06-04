class CreateExerciseSolvers < ActiveRecord::Migration[5.2]
  def change
    create_table :exercise_solvers do |t|
      t.integer :student_id
      t.integer :exercise_id

      t.timestamps
    end
    add_index :exercise_solvers, :student_id
    add_index :exercise_solvers, :exercise_id
    add_index :exercise_solvers, [:follower_id, :follower_id], unique: true
  end
end
