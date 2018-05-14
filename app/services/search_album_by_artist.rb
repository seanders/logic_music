class SearchAlbumByArtist
  def call(artist_name:)
    # Empty search for now since we just wanna query for albums by artist
    discogs_client.search('', :per_page => 20, type: :master, format: 'album', artist: artist_name)
  end

  def discogs_client
    # TODO: Make this env variable
    @_discogs_client ||= Discogs::Wrapper.new("wtf", user_token: 'jNwDjmeilCUiJethKFZFCIUKZGquHgFOLzovtpwJ')
  end

  def default_search_params

  end
end
