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
import { getRecommendedTracks } from '../redux/trackSlice';
import { setArtistSeedList, setTempo } from '../redux/playlistSlice';
import { searchTracksOrUsers } from '../redux/searchSlice';

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
  const [searchVal, setSearchVal] = useState("");

  const tempo = useSelector(state => state.playlist.tempo);
  const artistSeedList = useSelector(state => state.playlist.artistSeedList);
  const artistOptions = useSelector(state => state.search?.artistData?.items);
  console.log(artistSeedList)
  const dispatch = useDispatch()
  
  const handleTempoChange = (e) => {
    const {target: {value: newValStr}} = e
    const newVal = Number(newValStr)
    dispatch(setTempo(newVal))
  };

  const handleOptionSelected = (e, newValue) => {
    console.log(newValue)
    const idList = newValue.map((item) => {
      return {
        id: item.id,
        name: item.name
      }
    })
    dispatch(setArtistSeedList(idList))
  };

  const debouncedSearchVal = useDebounce(searchVal, 500);
  useEffect(() => {
    if (debouncedSearchVal && debouncedSearchVal.length > 2) {
       
      dispatch(searchTracksOrUsers(debouncedSearchVal))

    }
  }, [debouncedSearchVal]);

  //);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const artistIdList = artistSeedList.map((item) => item?.id)
    const seedArtistStr = artistIdList.join(',')
    await dispatch(getRecommendedTracks({tempo, seedArtistStr}))
    window.location.href = "/result";
  };

  const isSubmitDisabled = !tempo || !artistSeedList || !artistSeedList.length

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
                  id="tags-standard"
                  getOptionKey={(option) => option.id} 
                  getOptionLabel={(option) => option.name}
                  options={artistOptions}
                  onChange={handleOptionSelected}
                  onInputChange={(e, newInputValue) => {
                    setSearchVal(newInputValue)
                  }}
                  value={artistSeedList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Select artists"
                      placeholder="Select artists"
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
