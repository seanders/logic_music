class AddImageUrlToAlbum < ActiveRecord::Migration[5.0]
  def change
    add_column :albums, :image_url, :text
  end
end
