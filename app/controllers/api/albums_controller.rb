class Api::AlbumsController < ApplicationController
  before_action :find_album, only: [:update, :destroy]

  def index
    # TODO: Paginate
    @albums = Album.all
    render json: @albums, each_serializer: ::AlbumSerializer
  end

  def create
    artist = if creating_new_artist?
      Artist.create(name: params[:newArtistName])
    else
      Artist.find(params[:artistId])
    end

    if artist.errors.any?
      return render json: { error: artist.errors.full_messages.join(',') }, status: :unprocessable_entity
    end

    album = artist.albums.create(
      title: params[:title],
      condition: params[:condition],
      year: params[:year]
    )

    if album.errors.any?
      return render json: { error: album.errors.full_messages.join(',') }, status: :unprocessable_entity
    end

    render json: album
  end

  def update
    @album.update(
      title: params[:title],
      condition: params[:condition],
      year: params[:year],
      artist_id: params[:artistId]
    )

    if @album.errors.any?
      render json: { errors: @albums.errors.full_messages.join(', ')}, status: :unprocessable_entity
    else
      render json: @album
    end
  end

  def destroy
    if @album.destroy
      render nothing: true, status: :no_content
    else
      render json: { error: @album.errors.full_messages.join(', ')}, status: :unprocessable_entity
    end
  end

  private

  def find_album
    @album = Album.find(params[:id])
  end

  def creating_new_artist?
    params[:createNewArtist].present?
  end
end
