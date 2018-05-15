class Album < ApplicationRecord
  CONDITIONS = [ :excellent, :ok, :bad ].freeze
  belongs_to :artist
  enum condition: CONDITIONS
end
