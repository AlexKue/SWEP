class ExerciseSolver < ApplicationRecord
    belongs_to :user
    belongs_to :exercise
    belongs_to :student_query

    validates :user_id, presence: true
    validates :exercise_id, presence: true

end
