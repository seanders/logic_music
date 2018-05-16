class Album < ApplicationRecord
  CONDITIONS = [ :excellent, :ok, :bad ].freeze
  belongs_to :artist
  validates :title, uniqueness: { scope: :artist_id }
  enum condition: CONDITIONS
end
