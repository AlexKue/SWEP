class Category < ApplicationRecord
    has_many :exercises

    validates :text, presence: true
    validates :title, presence: true
end
