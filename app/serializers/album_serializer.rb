class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :condition, :artistId, :imageUrl

  belongs_to :artist

  def artistId
    object.artist_id
  end

  def createdAt
    object.created_at
  end

  def updatedAt
    object.updated_at
  end

  def imageUrl
    object.image_url
  end
end
