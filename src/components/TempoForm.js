import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Container,
  Box,
  Chip,
  Autocomplete,
} from '@mui/material';
import { getRecommendedTracks } from '../redux/trackSlice';
import { setSelectedGenreList, setTempo } from '../redux/playlistSlice';

const FULL_GENRE_LIST = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

const TempoForm = () => {
  const tempo = useSelector(state => state.playlist.tempo);
  const selectedGenreList = useSelector(state => state.playlist.selectedGenreList);

  const dispatch = useDispatch()
  
  const handleTempoChange = (e) => {
    const {target: {value: newValStr}} = e
    const newVal = Number(newValStr)
    dispatch(setTempo(newVal))
  };

  const handleGenreChange = (e, newValue) => {
    dispatch(setSelectedGenreList(newValue))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genreStr = selectedGenreList.join(',')
    await dispatch(getRecommendedTracks({tempo, genreStr}))
    window.location.href = "/result";
  };

  const isSubmitDisabled = !tempo || !selectedGenreList || !selectedGenreList.length

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="tel"
                label="Tempo"
                variant="outlined"
                value={tempo}
                onChange={handleTempoChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={FULL_GENRE_LIST}
                  onChange={handleGenreChange}
                  value={selectedGenreList}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Select genres"
                      placeholder="Select genres"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} label={option} />
                    ))
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={isSubmitDisabled}  type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default TempoForm;
