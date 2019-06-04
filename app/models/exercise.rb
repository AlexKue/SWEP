class Exercise < ApplicationRecord
    has_many :exercise_solvers
    has_many :users, through: :exercise_solvers
end
