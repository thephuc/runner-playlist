import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TRACK_ACTIONS } from '../utils/constants';
import { getMultipleTracksFeatureApi, getRecommendedTracksApi } from '../apiServices/trackService';

export const getRecommendedTracks = createAsyncThunk(
  'track/getRecommendedTracks',
  async (inputData, {rejectWithValue}) => {
    try {
      const response = await getRecommendedTracksApi(inputData);
      return response;
    } catch (error) {
      console.error(`failed to get recommended tracks`)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMultipleTracksFeature = createAsyncThunk(
  'track/getMultipleTracksFeature',
  async (inputData, {rejectWithValue}) => {
    try {
      if (!inputData || !Array.isArray(inputData || inputData.length < 1)) {
        //  Todo: send noti here
        return;
      }
      const response = await getMultipleTracksFeatureApi(inputData)
      return response
    } catch (error) {
      console.error(`failed to get track features`)
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const getRecommendedTracksWithFeature = createAsyncThunk(
  'track/getRecommendedTracksWithFeature',
  async (inputData, {dispatch, rejectWithValue}) => {
    try {
      const { payload: recommendedTrackList} = await dispatch(getRecommendedTracks(inputData))
      const idList = recommendedTrackList.map((track) => track?.id)
      const { payload: trackListFeature} = await dispatch(getMultipleTracksFeature(idList))
      const trackFeatureMap = trackListFeature.reduce((curr, item) => {
        if (item?.id) {
          curr[item.id] = item
        }
        return curr
      }, {})

      return recommendedTrackList.map((item) => {
        const { id } = item
        if (trackFeatureMap[id]) {
          item = {
            ...item,
            ...trackFeatureMap[id]
          }
        }
        return item
      })
    } catch (error) {
      console.error(`failed to get song features for recommended tracks `, error)
      return rejectWithValue(error?.response?.data)
    }
  }
)


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
      }
    },
    addTrack(state, action) {
      state.tracks.push(action.payload);
    },
    removeTrack(state, action) {
      state.tracks = state.tracks.filter(track => track.id !== action.payload.id);
    },
    setTrackList(state, action) {
      if (action.payload.trackList) {
        const { payload: {trackList} } = action;
        state.tracks = trackList;
      }
    },
    removeAllTracks(state) {
      state.tracks = [];
      //  TODO: delete all commented localStorage calls
      //localStorage.removeItem('tracks')
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(getRecommendedTracks.pending, (state) => {
    //  state.loading = true;
    //  state.error = null;
    //})    
    //builder.addCase(getRecommendedTracks.fulfilled, (state, action) => {
    //  state.loading = false;
    //  if (action.payload) {
    //    state.tracks = action.payload
    //  }
    //})    
    //builder.addCase(getRecommendedTracks.rejected, (state, action) => {
    //  state.loading = false;
    //  state.error = action.payload;
    //})    
    builder.addCase(getRecommendedTracksWithFeature.pending, (state) => {
      state.loading = true;
      state.error = null;
    })    
    builder.addCase(getRecommendedTracksWithFeature.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload)
        state.tracks = action.payload
      }
    })    
    builder.addCase(getRecommendedTracksWithFeature.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
});

export const { addTrack, removeTrack, removeAllTracks, setTrackList, setTrackIsSelected } = trackSlice.actions;

export default trackSlice.reducer;
