class Exercise < ApplicationRecord
    has_many :exercise_solvers
    has_many :users, through: :exercise_solvers
    belongs_to :category

    validates :category_id, presence: true
end
