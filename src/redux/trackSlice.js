import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TRACK_ACTIONS } from '../utils/constants';
import { getRecommendedTracksApi } from '../apiServices/trackService';

export const getRecommendedTracks = createAsyncThunk(
  'track/getRecommendedTracks',
  async (inputData, thunkAPI) => {
    try {
      const response = await getRecommendedTracksApi(inputData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  tracks: [],  // Array to store track data
  loading: false,
  error: null
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackIsSelected(state, action) {
      const { trackId, trackAction } = action.payload;
      if (trackId && trackAction) {
        state.tracks = state.tracks.map((trackData) => {
          if (trackData.id == trackId) 
            if (trackAction == TRACK_ACTIONS.ADD)
              trackData.isSelected = true
            else if (trackAction == TRACK_ACTIONS.REMOVE)
              trackData.isSelected = false
          return trackData;
        })
        //localStorage.setItem('tracks', JSON.stringify(state.tracks))
      }
    },
    addTrack(state, action) {
      state.tracks.push(action.payload);
      //localStorage.setItem('tracks', JSON.stringify(state.tracks))
    },
    removeTrack(state, action) {
      state.tracks = state.tracks.filter(track => track.id !== action.payload.id);
      //localStorage.setItem('tracks', JSON.stringify(state.tracks))
    },
    setTrackList(state, action) {
      if (action.payload.trackList) {
        const { payload: {trackList} } = action;
        console.log(trackList)

        state.tracks = trackList;
        //localStorage.setItem('tracks', JSON.stringify(trackList))
      }
    },
    removeAllTracks(state) {
      state.tracks = [];
      //  TODO: delete all commented localStorage calls
      //localStorage.removeItem('tracks')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecommendedTracks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })    
    builder.addCase(getRecommendedTracks.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.tracks = action.payload
        //localStorage.setItem('tracks', JSON.stringify(action.payload))
      }
    })    
    builder.addCase(getRecommendedTracks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })    
  }
});

export const { addTrack, removeTrack, removeAllTracks, setTrackList, setTrackIsSelected } = trackSlice.actions;

export default trackSlice.reducer;
