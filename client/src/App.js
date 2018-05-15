import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getArtists, getAlbums } from './services/musicClient';
import ArtistList from './ArtistList';
import AlbumsList from './AlbumsList';
import UpsertAlbumDialog from './UpsertAlbumDialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlbumUpsertModal: false,
      artists: [],
      selectedArtistId: null,
      selectedAlbumId: null,
      albums: {}
    };
  }

  async hydrateData() {
    const artists = await getArtists();
    const albums = await getAlbums();

    this.setState({
      artists,
      albums: albums.reduce((result, album) => ({...result, [album.id]: album}), {}),
      selectedArtistId: artists[0] && artists[0].id,
    })
  }

  componentDidMount() {
    this.hydrateData();
  }

  closeModal() {
    this.setState({ showAlbumUpsertModal: false });
  }

  onAddAlbumClick = () => {
    this.setState({ showAlbumUpsertModal: true });
  }

  onArtistClick = (selectedArtistId) => {
    this.setState({ selectedArtistId });
  }

  selectAlbumToEdit = (albumId) => {
    this.setState({ selectedAlbumId: albumId, showAlbumUpsertModal: true });
  }

  saveAlbum = (album) => {
    this.setState((prevState) => ({
      albums: { ...prevState.albums, [album.id]: album }
    }))
  }

  render() {
    const { artists, selectedArtistId, albums, showAlbumUpsertModal, selectedAlbumId } = this.state;

    const albumsForSelectedArtist = Object.values(albums).filter(album => album.artist_id === selectedArtistId);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Greg's hipster album paradise.</h1>
          <Button variant="raised" color="primary" onClick={this.onAddAlbumClick}>
            Add Album
            <AddIcon />
          </Button>
        </header>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: 460 }}>
            <ArtistList artists={artists} selectedArtistId={selectedArtistId} onArtistClick={this.onArtistClick}/>
          </div>
          <AlbumsList albums={albumsForSelectedArtist} onAlbumEdit={this.selectAlbumToEdit} />
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
