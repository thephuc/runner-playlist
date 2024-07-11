import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import TrackList from './resultComponent.js/TrackList';

const SearchResults = () => {
  //const dispatch = useDispatch()
  const trackList = useSelector(state => state.track.tracks);
  const flattenedTrackList = trackList.map((trackInfo) => {
    const {id, name, previewUrl, album, isSelected} = trackInfo;
    const {artists, images, name: albumName } = album;
    const artistNameList = artists && artists.map((artist => artist.name));
    const artistNames = artistNameList && artistNameList.join(', ')
    const albumCover = images[0]
    return {
      id, 
      name, 
      previewUrl, 
      artist: artistNames,
      album: albumName,
      albumImage: albumCover.url,
      isSelected
    }

  })
  return (
    <div>
      <Typography variant="h5">Search Results</Typography>
      <TrackList tracks={flattenedTrackList} />
    </div>
  );
};

export default SearchResults;
