class Api::SearchController < ApplicationController
  def search
    search_service = ::SearchAlbumByArtist.new
    search_service.call(artist_name: params[:artist_name])
    render json: { danK: 1 }
  end
end
