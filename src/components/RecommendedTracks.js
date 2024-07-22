import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import TrackList from './resultComponents/TrackList';
import CreatePlaylistDialog from './resultComponents/CreatePlaylistDialog';
import { createNewPlaylistWithSongs } from '../redux/playlistSlice';

const RecommendedTracks = () => {
  const dispatch = useDispatch()
  const trackList = useSelector(state => state.track.tracks);
  const tempo = useSelector(state => state.playlist.tempo);
  const artistSeedList = useSelector(state => state.playlist.artistSeedList);
  const seedArtistNames = artistSeedList.map((artist) => artist?.name)

  const trackSeedList = useSelector(state => state.playlist.trackSeedList);
  const seedTrackNames = trackSeedList.map((track) => track?.name)


  const flattenedTrackList = trackList.map((trackInfo) => {
    const {id, name, previewUrl, album, isSelected, uri, popularity} = trackInfo;
    const {artists, images, name: albumName, release_date: releaseDate } = album;
    const artistNameList = artists && artists.map((artist => artist.name));
    const artistNames = artistNameList && artistNameList.join(' | ')
    const albumCover = images[0]
    return {
      id, 
      name, 
      previewUrl, 
      artist: artistNames,
      albumName: albumName,
      albumImage: albumCover.url,
      releaseDate,
      isSelected,
      uri,
      popularity
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
      <Typography align='center' marginTop={4} variant="h4">Create playlist with recommended Tracks</Typography>
      <Typography align='center' marginTop={2} variant="subtitle1">Tempo: {tempo}</Typography>
      {
        seedArtistNames && seedArtistNames.length > 0 &&
            <Typography marginX={2} align='center' variant="subtitle1">Seed Artist(s): {seedArtistNames.join(', ')}</Typography>
      }
      {
        seedTrackNames && seedTrackNames.length > 0 &&
            <Typography marginX={2} align='center' variant="subtitle1">Seed Track(s): {seedTrackNames.join(', ')}</Typography>
      }
      <TrackList tracks={flattenedTrackList} />
      <CreatePlaylistDialog handleSubmit={handleCreatePlaylistSubmit} />
    </div>
  );
};

export default RecommendedTracks;
