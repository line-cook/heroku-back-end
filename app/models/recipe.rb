class Recipe < ActiveRecord::Base
  has_many :favorites
  has_many :users, through: :favorites

  validates :title, :big_oven_id, presence: true
end
