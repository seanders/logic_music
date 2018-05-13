class Api::ArtistsController < ApplicationController
  def index
    # TODO: Paginate
    @artists = Artist.all
    render json: @artists
  end
end
