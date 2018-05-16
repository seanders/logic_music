class Api::SearchController < ApplicationController
  def search
    search_service = ::DiscogsClient.new
    result = search_service.search(artist_name: params[:artist_name])
    render json: result
  end
end
