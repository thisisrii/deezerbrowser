import React, { useState } from 'react';
import Search from './components/search/Search';
import AlbumGrid from './components/album/AlbumGrid';
import { Container, Typography } from '@material-ui/core';
import { searchForAlbums, searchForTracks } from './services/SearchService';
import TracksContainer from './components/tracks/TracksContainer';

function App() {
  const [artist, setArtist] = useState('');
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);

  const handleSearch = (value) => {
    setArtist(value);
    searchForAlbums(value).then((response) => {
      setAlbums(response);
    });

  }

  function handleAlbumClick(id) {
    searchForTracks(id).then((response) => {
      setAlbum(response);
    });
  }

  return (
    <React.Fragment>
      <Container fixed>
        <Typography variant='h1'>Dezeer Application</Typography>
        <Search handleSearch={handleSearch}></Search>
        {albums.length > 0 ?
          <React.Fragment>
            <Typography variant='h3'>Albums</Typography>
            <AlbumGrid albums={albums} handleAlbumClick={handleAlbumClick}></AlbumGrid>
            <TracksContainer album={album} ></TracksContainer></React.Fragment> : null
        }
      </Container>
    </React.Fragment>
  );
}

export default App;
