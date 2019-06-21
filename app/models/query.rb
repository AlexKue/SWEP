class Query < ApplicationRecord
  belongs_to :exercise

  validates :query, presence: true
end
