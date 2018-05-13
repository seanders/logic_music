class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.text :title
      t.integer :year
      t.integer :condition
      t.integer :artist_id

      t.timestamps
    end
  end
end
