import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSearchApi } from '../apiServices/searchService';
import { SEARCH_TYPE } from '../utils/constants';

export const searchSpotifyData = createAsyncThunk(
  'search/searchSpotifyData',
  async (inputData, thunkAPI) => {
    try {
      const { type } = inputData;
      const response = await getSearchApi(inputData);
      return {type, response};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  trackData: {
    items: []
  },  
  artistData: {
    items: []
  },
  loading: false,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchSpotifyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })    
    builder.addCase(searchSpotifyData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { type, response: {trackData, artistData} } = action.payload
        if (type == SEARCH_TYPE.ARTIST) {
          state.artistData = artistData          
        } else if (type == SEARCH_TYPE.TRACK) {
          state.trackData = trackData
        }
      }
    })    
    builder.addCase(searchSpotifyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })    
  }
});

export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
