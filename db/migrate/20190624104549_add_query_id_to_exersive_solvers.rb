class AddQueryIdToExersiveSolvers < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_solvers, :query_id, :integer
  end
end
