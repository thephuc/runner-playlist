import React, {useEffect, useState} from 'react';
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
import { getRecommendedTracksWithFeature } from '../redux/trackSlice';
import { setArtistSeedList, setTempo, setTrackSeedList } from '../redux/playlistSlice';
import { searchSpotifyData } from '../redux/searchSlice';
import { SEARCH_TYPE } from '../utils/constants';

//  TODO: move this to a separate custom hook file
function useDebounce(cb, delay) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);
  return debounceValue;
}

const TempoForm = () => {
  const [searchArtist, setSearchArtist] = useState("");
  const [searchTrack, setSearchTrack] = useState("");

  const tempo = useSelector(state => state.playlist.tempo);

  const artistSeedList = useSelector(state => state.playlist.artistSeedList);
  const artistOptions = useSelector(state => state.search?.artistData?.items);

  const trackSeedList = useSelector(state => state.playlist.trackSeedList);
  const trackOptions = useSelector(state => state.search?.trackData?.items);


  const dispatch = useDispatch()
  
  const handleTempoChange = (e) => {
    const {target: {value: newValStr}} = e
    const newVal = Number(newValStr)
    dispatch(setTempo(newVal))
  };

  const handleOptionSelected = (newValue, type) => {
    console.log(newValue)
    const itemList = newValue.map((item) => {
      return {
        id: item.id,
        name: getTrackName(item)
      }
    })

    if (type == SEARCH_TYPE.ARTIST) {
      dispatch(setArtistSeedList(itemList))
    } else if (type == SEARCH_TYPE.TRACK) {
      dispatch(setTrackSeedList(itemList))
    }
  };

  const debouncedSearchArtist = useDebounce(searchArtist, 500);
  useEffect(() => {
    if (debouncedSearchArtist && debouncedSearchArtist.length > 2) {
      dispatch(searchSpotifyData({queryStr: debouncedSearchArtist, type: SEARCH_TYPE.ARTIST}))
    }
  }, [debouncedSearchArtist]);

  const debouncedSearchTrack = useDebounce(searchTrack, 500);
  useEffect(() => {
    if (debouncedSearchTrack && debouncedSearchTrack.length > 2) {
      dispatch(searchSpotifyData({queryStr: debouncedSearchTrack, type: SEARCH_TYPE.TRACK}))
    }
  }, [debouncedSearchTrack]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const artistIdList = artistSeedList.map((item) => item?.id)
    const seedArtistStr = artistIdList.join(',')

    const trackIdList = trackSeedList.map((item) => item?.id)
    const seedTrackStr = trackIdList.join(',')
    await dispatch(getRecommendedTracksWithFeature({tempo, seedArtistStr, seedTrackStr}))
    window.location.href = "/result";
  };

  const getTrackName = (trackData) => {
    const { name , artists } = trackData;
    const artistName = artists && artists.length > 0 && artists[0]?.name
    if (artistName) return `${name} - by ${artistName}`
    return name
  }

  const checkSubmitDisabled = () => {
    if (!tempo) return true
    if (artistSeedList && artistSeedList.length == 0 && trackSeedList && trackSeedList.length == 0) return true
    return false
  }
  const isSubmitDisabled = checkSubmitDisabled()
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
                  freeSolo
                  id="search-artists"
                  getOptionKey={(option) => option.id} 
                  getOptionLabel={(option) => option.name}
                  options={artistOptions}
                  onChange={(e, val) => handleOptionSelected(val, SEARCH_TYPE.ARTIST)}
                  onInputChange={(e, newInputValue) => {
                    setSearchArtist(newInputValue)
                  }}
                  value={artistSeedList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Search for seed artists"
                      placeholder="Search for seed artists"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option.id} label={option.name} />
                    ))
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <Autocomplete
                  multiple
                  freeSolo
                  id="search-tracks"
                  getOptionKey={(option) => option.id} 
                  getOptionLabel={(option) => getTrackName(option)}
                  options={trackOptions}
                  onChange={(e, val) => handleOptionSelected(val, SEARCH_TYPE.TRACK)}
                  onInputChange={(e, newInputValue) => {
                    setSearchTrack(newInputValue)
                  }}
                  value={trackSeedList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Search for seed tracks"
                      placeholder="Search for seed tracks"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option.id} label={option.name} />
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
