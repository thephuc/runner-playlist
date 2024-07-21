import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSearchApi } from '../apiServices/searchService';

export const searchTracksOrUsers = createAsyncThunk(
  'search/searchTracksOrUsers',
  async (inputData, thunkAPI) => {
    try {
      const response = await getSearchApi(inputData);
      return response;
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
    builder.addCase(searchTracksOrUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })    
    builder.addCase(searchTracksOrUsers.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { trackData, artistData } = action.payload
        state.trackData = trackData
        state.artistData = artistData
      }
    })    
    builder.addCase(searchTracksOrUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })    
  }
});

export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
