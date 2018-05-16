import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import musicClient from './services/musicClient';
import ArtistList from './ArtistList';
import AlbumsList from './AlbumsList';
import UpsertAlbumDialog from './UpsertAlbumDialog';
import ArtistProlificnessChart from './ArtistProlificnessChart';
import TypeaheadSearch from './TypeaheadSearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlbumUpsertModal: false,
      artists: {},
      selectedArtistId: null,
      selectedAlbumId: null,
      albums: {},
      highlightedYear: null,
    };
  }

  async hydrateData() {
    const [artistResponse, albumResponse] = await Promise.all([musicClient.getArtists(), musicClient.getAlbums()]);
    const artists = artistResponse.data;
    const albums = albumResponse.data;

    if (!artistResponse.success || !albumResponse.success) {
      throw new Error('Failed to fetch initial data');
    }

    // Normalize data
    this.setState({
      artists: artists.reduce((result, album) => ({...result, [album.id]: album}), {}),
      albums: albums.reduce((result, album) => ({...result, [album.id]: album}), {}),
      selectedArtistId: artists[0] && artists[0].id, // On initialization, we'll just select the first artist (if present)
    });
  }

  componentDidCatch() {
    // TODO: Implement error state in the UI
  }

  componentDidMount() {
    this.hydrateData();
  }

  closeModal() {
    this.setState({ showAlbumUpsertModal: false, selectedAlbumId: null });
  }

  onAddAlbumClick = () => {
    this.setState({ showAlbumUpsertModal: true });
  }

  onArtistClick = (selectedArtistId) => {
    this.setState({ selectedArtistId, highlightedYear: null });
  }

  selectAlbumToEdit = (albumId) => {
    this.setState({ selectedAlbumId: albumId, showAlbumUpsertModal: true });
  }

  saveAlbum = async (albumAttributes) => {
    const response = await musicClient.upsertAlbum(albumAttributes);
    const album = response.data;

    if (response.success) {
      this.setState((prevState) => ({
        albums: { ...prevState.albums, [album.id]: album },
        artists: { ...prevState.artists, [album.artist.id]: album.artist }
      }));
    }

    return response;
  }

  saveDiscogAlbum = async (discogsAlbum) => {
    const response = await musicClient.createAlbumFromDiscogs(discogsAlbum.id);
    const album = response.data;
    if (response.success) {
      this.setState((prevState) => ({
        albums: { ...prevState.albums, [album.id]: album },
        artists: { ...prevState.artists, [album.artist.id]: album.artist }
      }));
    }
  }

  destroyAlbum = async (albumId) => {
    const response = await musicClient.destroyAlbum(albumId);
    if (response.success) {
      this.setState((prevState) => {
        delete prevState.albums[albumId]

        return {
          albums: prevState.albums,
        }
      })
    }
  }

  handleBarClick = ({ year }) => {
    this.setState({
      highlightedYear: year,
    });
  }

  render() {
    const { artists: artistsMap, selectedArtistId, albums, showAlbumUpsertModal, selectedAlbumId, highlightedYear } = this.state;
    const artists = Object.values(artistsMap);

    const albumsForSelectedArtist = Object.values(albums).filter(album => album.artistId === selectedArtistId);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Greg's hipster album paradise. Start searching...</h1>
          <TypeaheadSearch onSelect={this.saveDiscogAlbum}/>
          <h1 className="App-title">or manually</h1>
          <Button variant="raised" color="primary" onClick={this.onAddAlbumClick}>
            <AddIcon />
            Add Album
          </Button>
        </header>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '20%' }}>
            <ArtistList artists={artists} selectedArtistId={selectedArtistId} onArtistClick={this.onArtistClick}/>
          </div>
          <div style={{ width: '60%'}}>
            <AlbumsList albums={albumsForSelectedArtist} onAlbumEdit={this.selectAlbumToEdit} onAlbumDestroy={this.destroyAlbum} highlightedYear={highlightedYear} />
          </div>
          <div style={{ width: '30%' }}>
            <Typography variant="headline" gutterBottom>
              Prolificness
            </Typography>
            <ArtistProlificnessChart artistId={selectedArtistId} albums={albumsForSelectedArtist} onBarClick={this.handleBarClick} />
          </div>
          <UpsertAlbumDialog
            album={albums[selectedAlbumId] ? {...albums[selectedAlbumId]} : null}
            artists={artists}
            open={showAlbumUpsertModal}
            handleClose={this.closeModal.bind(this)}
            onSave={this.saveAlbum}
          />
        </div>
      </div>
    );
  }
}

export default App;
