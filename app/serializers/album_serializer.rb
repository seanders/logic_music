class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :condition, :artistId

  def artistId
    object.artist_id
  end

  def createdAt
    object.created_at
  end

  def updatedAt
    object.updated_at
  end
end
