class AddQueryIdToExersiveSolvers < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_solvers, :student_query_id, :integer
  end
end
