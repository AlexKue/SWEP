class Exercise < ApplicationRecord
    has_many :exercise_solvers
    has_many :users,    through: :exercise_solvers,
                        dependent: :destroy
    
    has_many :queries, dependent: :destroy
    belongs_to :category

    validates :category_id, presence: true
    validates :title, presence: true
    validates :text, presence: true
    validates :points, presence: true
    

end
