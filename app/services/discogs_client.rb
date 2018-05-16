class DiscogsClient
  def search(artist_name:)
    # Empty search for now since we just wanna query for albums by artist
    discogs_client.search('', :per_page => 20, type: :master, format: 'album', artist: artist_name)
  end

  def find_album(id:)
    master_release = discogs_client.get_master_release(id)
    extract_album_attributes(release: master_release)
  end

  private

  def discogs_client
    # TODO: Make this env variable
    @_discogs_client ||= Discogs::Wrapper.new("wtf", user_token: 'jNwDjmeilCUiJethKFZFCIUKZGquHgFOLzovtpwJ')
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
end
