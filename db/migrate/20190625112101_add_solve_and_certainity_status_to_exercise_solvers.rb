class AddSolveAndCertainityStatusToExerciseSolvers < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_solvers, :solved, :boolean, default: false
    add_column :exercise_solvers, :certain, :boolean, default: true
  end
end
