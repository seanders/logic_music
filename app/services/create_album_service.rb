class CreateAlbumService
  def initialize(artist_id: nil, new_artist_name:, create_new_artist:, title:, year:, condition: 'excellent', image_url: nil)
    @artist_id = artist_id
    @new_artist_name = new_artist_name
    @create_new_artist = create_new_artist
    @title = title
    @year = year
    @condition = condition
    @image_url = image_url
  end

  def call
    artist = find_or_create_artist

    if artist.errors.any?
      return ServiceResult.new(success: false, errors: artist.errors.full_messages.join(','))
    end

    album = artist.albums.create(
      title: title,
      condition: condition,
      year: year,
      image_url: image_url
    )

    if artist.errors.any?
      return ServiceResult.new(success: false, errors: album.errors.full_messages.join(','))
    end

    ServiceResult.new(success: true, data: album)
  end

  private

  attr_reader :artist_id, :new_artist_name, :create_new_artist,
    :title, :year, :condition, :image_url

  def find_or_create_artist
    if creating_new_artist?
      Artist.where(name: new_artist_name).first_or_create
    else
      Artist.find(artist_id)
    end
  end

  def creating_new_artist?
    !!create_new_artist
  end
end
