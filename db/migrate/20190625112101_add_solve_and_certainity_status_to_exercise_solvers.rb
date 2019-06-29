class AddSolveAndCertainityStatusToExerciseSolvers < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_solvers, :solved, :boolean
  end
end
