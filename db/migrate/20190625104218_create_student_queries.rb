class CreateStudentQueries < ActiveRecord::Migration[5.2]
  def change
    create_table :student_queries do |t|
      t.text :query

      t.timestamps
    end
  end
end
