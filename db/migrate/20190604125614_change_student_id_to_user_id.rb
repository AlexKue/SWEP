class ChangeStudentIdToUserId < ActiveRecord::Migration[5.2]
  def change
    rename_column :exercise_solvers, :student_id, :user_id
  end
end
