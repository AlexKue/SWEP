class CreateQueries < ActiveRecord::Migration[5.2]
  def change
    create_table :queries do |t|
      t.string :query
      t.references :exercise, foreign_key: true

      t.timestamps
    end
  end
end
