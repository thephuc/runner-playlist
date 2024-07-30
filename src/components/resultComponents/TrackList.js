import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Box,
  FormControl,
  CardMedia,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { TRACK_ACTIONS } from '../../utils/constants';
import { setTrackIsSelected } from '../../redux/trackSlice';

const TrackList = ({ tracks }) => {
  const dispatch = useDispatch()

  const handleTrackBtn = (e, trackId, trackAction) => {
    e.preventDefault();
    dispatch(setTrackIsSelected({trackId, trackAction}))
  };

  return (
    <Grid container spacing={2} marginY={4} paddingX={2} justifyContent="center">
      {tracks.map((track) => (
        <Grid item xs={12} md={4} lg={3} key={track.id} sx={{ 
          //display: 'flex',  
          marginBottom: 2, width: '100%'}}>
          <Card sx={{ 
            display: 'flex',
            //justifyContent: 'space-between', 
            flexDirection: 'column', 
            flex: '1 0 auto', marginBottom: 2, width: '100%', height: '100%' }}>
            <Typography variant="h5" align='center' gutterBottom sx={{wordBreak: 'break-word'}}>
              {track.name}
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto', flexDirection: 'column', width: 0, minWidth:'30%' }}>
                <Typography variant="body1" color="text.secondary">
                  Artist: {track.artist}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Album: {track.albumName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Release date: {track?.releaseDate}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Popularity: {track?.popularity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tempo: {track?.tempo}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Valence: {track?.valence}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Time Signature: {track?.timeSignature}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 150, flexShrink: 0, marginRight: 2 }}
                image={track.albumImage}
                alt="Album Cover"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }} mt={2}>
              {
                track.previewUrl && 
                  <Box align='center' sx={{ display: 'flex'}}>
                    <Divider />
                    <IconButton aria-label="play" sx={{ flex: '1 0 auto'}}>
                      <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                      </audio>
                    </IconButton>
                  </Box>
              }
              <FormControl variant="outlined" align='center' sx={{marginX: 2}} >
                {track.isSelected ?
                  <Button color='secondary' variant="contained" onClick={(e) => handleTrackBtn(e, track.id, TRACK_ACTIONS.REMOVE)}>Remove from playlist</Button> 
                  :
                  <Button color='success' variant="contained" onClick={(e) => handleTrackBtn(e, track.id, TRACK_ACTIONS.ADD)}>Add to playlist</Button>
                }
              </FormControl>    
            </Box>
            
            
            {/*<CardActions>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  
                </Grid>
              </Grid>
            </CardActions>*/}
            
            
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    previewUrl: PropTypes.string,
    albumImage: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    tempo: PropTypes.number,
    valence: PropTypes.string,
    timeSignature: PropTypes.number,
  })).isRequired,
};

export default TrackList;
