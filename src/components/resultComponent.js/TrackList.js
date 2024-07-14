import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
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
    <Grid container spacing={2} justifyContent="center">
      {tracks.map((track) => (
        <Grid item xs={12} key={track.id} sx={{ display: 'flex', marginBottom: 2, padding: 2 }}>
          <Card sx={{ display: 'flex', marginBottom: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5" gutterBottom>
                  {track.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Artist: {track.artist}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Album: {track.album}
                </Typography>
                
                {
                  track.previewUrl && 
                  <Box mt={2}>
                    <Divider />
                    <IconButton aria-label="play">
                      <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                      </audio>
                    </IconButton>
                  </Box>
                }    
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150, flexShrink: 0, margin: 'auto' }}
              image={track.albumImage}
              alt="Album Cover"
            />
            <CardActions>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <FormControl variant="outlined">
                    {track.isSelected ?
                      <Button color='secondary' variant="contained" onClick={(e) => handleTrackBtn(e, track.id, TRACK_ACTIONS.REMOVE)}>Remove from playlist</Button> 
                      :
                      <Button color='success' variant="contained" onClick={(e) => handleTrackBtn(e, track.id, TRACK_ACTIONS.ADD)}>Add to playlist</Button>
                    }
                    

                  </FormControl>
                </Grid>
              </Grid>
            </CardActions>
            
            
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
    album: PropTypes.string.isRequired,
    previewUrl: PropTypes.string,
    albumImage: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
  })).isRequired,
};

export default TrackList;
