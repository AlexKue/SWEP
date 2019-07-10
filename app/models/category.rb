class Category < ApplicationRecord
    has_many :exercises, dependent: :destroy

    validates :text, presence: true
    validates :title, presence: true
end
