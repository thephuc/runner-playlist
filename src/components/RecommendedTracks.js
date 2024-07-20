import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import TrackList from './resultComponents/TrackList';
import CreatePlaylistDialog from './resultComponents/CreatePlaylistDialog';
import { createNewPlaylistWithSongs } from '../redux/playlistSlice';

const RecommendedTracks = () => {
  const dispatch = useDispatch()
  const trackList = useSelector(state => state.track.tracks);
  

  const flattenedTrackList = trackList.map((trackInfo) => {
    const {id, name, previewUrl, album, isSelected, uri} = trackInfo;
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
      isSelected,
      uri
    }
  })

  const handleCreatePlaylistSubmit = (formData) => {
    const { name, description, isPublic } = formData;
    const selectedTracks = flattenedTrackList.filter((track) => track?.isSelected)
    const trackUriList = selectedTracks.map((track) => track?.uri)
    const inputData = {
      name, isPublic, description, trackUriList
    }
    dispatch(createNewPlaylistWithSongs(inputData))
  }


  return (
    <div>
      <Typography variant="h5">Recommended Tracks</Typography>
      <TrackList tracks={flattenedTrackList} />
      <CreatePlaylistDialog handleSubmit={handleCreatePlaylistSubmit} />
    </div>
  );
};

export default RecommendedTracks;
