class Exercise < ApplicationRecord
    has_one :exercise_solver
    has_one :student_query,     through: :exercise_solver,
                                dependent: :destroy
    has_one :user,              through: :exercise_solver,
                                dependent: :destroy
    
    has_many :queries, dependent: :destroy
    belongs_to :category

    validates :category_id, presence: true
    validates :title, presence: true
    validates :text, presence: true
    validates :points, presence: true
    
end
