class Album < ApplicationRecord
  enum condition: [ :excellent, :ok, :bad ]
end
