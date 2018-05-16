class DiscogsClient
  def search(artist_name:)
    # Empty search for now since we just wanna query for albums by artist
    result = discogs_client.search('', :per_page => 20, type: :master, format: 'album', artist: artist_name)

    # For some reason,this doesn't raise as a 401. Seems like a bug in their API
    if result.message && result.message == invalid_token_message
      raise invalid_token_message
    end
  end

  def find_album(id:)
    master_release = discogs_client.get_master_release(id)
    extract_album_attributes(release: master_release)
  end

  private

  def discogs_client
    # First arg is an app name, which we aren't using in our implementation
    @_discogs_client ||= Discogs::Wrapper.new("_", user_token: ENV['DISCOGS_TOKEN'])
  end

  def extract_album_attributes(release:)
    {
      artist_name: release.artists.first&.name,
      title: release.title,
      year: release.year,
      image_url: find_primary_image_url_from_release(images: release.images)
    }
  end

  def find_primary_image_url_from_release(images:)
    image = images.find { |image| image.type == 'primary '}  || images.first
    image&.uri
  end

  def invalid_token_message
    "Invalid consumer token. Please register an app before making requests.".freeze
  end
end
