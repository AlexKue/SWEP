class AddQueryIdToExersiveSolvers < ActiveRecord::Migration[5.2]
  def change
    add_column :exercise_solvers, :query, :text
  end
end
