import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [
      {name: 'name1', artist: 'artist1', album: 'album1', id: 'id1'},
      {name: 'name2', artist: 'artist2', album: 'album2', id: 'id2'},
      {name: 'name3', artist: 'artist3', album: 'album3', id: 'id3'}
     ], 
     playlistName: 'Deep house',
     playlistTracks: [
      {name: 'namexxx', artist: 'artistxxx', album: 'albumxxx', id: 'idxxx', trackURIs: 'test1'},
      {name: 'nameyyy', artist: 'artistyyy', album: 'albumyyy', id: 'idyyy', trackURIs: 'test2'},
      {name: 'namezzz', artist: 'artistzzz', album: 'albumzzz', id: 'idzzz', trackURIs: 'test3'}
     ] };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
  }


addTrack(track) {
  let tracks = this.state.playlistTracks;
  if (tracks.find((tune) => track.id === tune.id)) {
    return; 
  };
  tracks.push(track);
  this.setState({playlistTracks: tracks })
} 

removeTrack(track) {
  let tracks = this.state.playlistTracks;
  const newPlaylistTracks = tracks.filter((tune) => tune.id !== track.id
  );
  this.setState({playlistTracks: newPlaylistTracks});
}

updatePlaylistName(name) {
  this.setState({PlaylistName: name})
}

savePlaylist() {
    let trackURIs = [];
  let playlistTracks = this.state.playlistTracks;
  playlistTracks.forEach((tune) => {
    trackURIs.push(tune.uri);
  });
  // this is to test the method: console.log(trackURIs);
  return trackURIs;
}

search(searchTerm) {
  console.log(searchTerm);
}


  render() {
    return ( 
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
    )
  }
};


export default App;
