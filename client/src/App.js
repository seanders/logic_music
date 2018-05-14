import React, { Component } from 'react';
import './App.css';
import { getArtists, getAlbums } from './services/musicClient';
import ArtistList from './ArtistList';
import AlbumsList from './AlbumsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      selectedArtistId: null,
      albums: []
    };
  }

  async hydrateData() {
    const artists = await getArtists();
    const albums = await getAlbums();

    this.setState({
      artists,
      albums,
      selectedArtistId: artists[0] && artists[0].id,
    })
  }

  componentDidMount() {
    this.hydrateData();
  }

  onArtistClick(selectedArtistId) {
    this.setState({ selectedArtistId })
  }

  render() {
    const { artists, selectedArtistId, albums } = this.state;

    const albumsForSelectedArtist = albums.filter(album => album.artist_id === selectedArtistId);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: 460 }}>
            <ArtistList artists={artists} selectedArtistId={selectedArtistId} onArtistClick={this.onArtistClick.bind(this)}/>
          </div>
          <AlbumsList albums={albumsForSelectedArtist} />
        </div>
      </div>
    );
  }
}

export default App;
