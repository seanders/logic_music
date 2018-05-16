class Api::AlbumsController < ApplicationController
  before_action :find_album, only: [:update, :destroy]

  def index
    # TODO: Paginate
    @albums = Album.all
    render json: @albums, each_serializer: ::AlbumSerializer
  end

  def create
    result = CreateAlbumService.new(
      artist_id: params[:artistId],
      new_artist_name: params[:newArtistName],
      create_new_artist: params[:createNewArtist],
      title: params[:title],
      year: params[:year],
      condition: params[:condition]
    ).call

    if result.success?
      render json: result.data
    else
      render json: { error: result.errors }
    end
  end

  def create_by_discogs
    album_attrs = DiscogsClient.new.find_album(id: params[:discogs_album_id])

    service_result = CreateAlbumService.new(
      image_url: album_attrs[:image_url],
      title: album_attrs[:title],
      year: album_attrs[:year],
      new_artist_name: album_attrs[:artist_name],
      create_new_artist: true # Hack for now to allow discog to find/create
    ).call

    render json: service_result.data
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
