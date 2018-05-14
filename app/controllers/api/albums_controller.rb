class Api::AlbumsController < ApplicationController
  def index
    # TODO: Paginate
    @albums = Album.all
    render json: @albums
  end
end
