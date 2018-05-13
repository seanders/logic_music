class Album < ApplicationRecord
  enum condition: [ :excellent, :ok, :bad ]
  belongs_to :artist
end
