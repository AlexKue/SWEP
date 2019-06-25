class StudentQuery < ApplicationRecord
    has_one :exercise_solver
    has_one :exercise, through: :exercise_solver
    has_one :user, through: :exercise_solver

    validates :query, presence: true
end
