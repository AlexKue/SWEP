class Query < ApplicationRecord
  belongs_to :exercise

  validates :exercise_id, presence: true
  validates :query, presence: true
end
