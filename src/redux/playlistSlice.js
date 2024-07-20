import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTracksToPlaylistApi, createNewPlaylistApi } from '../apiServices/playlistService';

export const createNewPlaylistWithSongs = createAsyncThunk(
  'playlist/createNewPlaylistWithSongs',
  async (inputData, {dispatch, getState, rejectWithValue}) => {
    const userId = getState().user?.userProfile?.id
    if (!userId) {
      //  TODO: handle this case
      return
    }
    try {
      const { name, isPublic, description, trackUriList } = inputData
      const playlistData = { name, isPublic, description }
      const createPlaylistResp = await createNewPlaylistApi({userId, playlistData});
      if (createPlaylistResp?.id) {
        dispatch(addTracksToPlaylist({playlistId: createPlaylistResp?.id, trackUriList}))
      }
      return createPlaylistResp;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTracksToPlaylist = createAsyncThunk(
  'playlist/addTracksToPlaylist',
  async ({playlistId, trackUriList}, {rejectWithValue}) => {
    try {
      const response = await addTracksToPlaylistApi({playlistId, trackUriList});
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  id: '',
  name: '', 
  isPublic: false, 
  description: '',
  href: '', 
  images: [], 
  uri: '',
  tempo: 0,
  genreList: [],
  trackList: [],  // Array to store track URIs
  loading: false,
  error: null
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setTempo(state, action) {
      state.tempo = action.payload || 0
    },
    setGenreList(state, action) {
      if (action.payload && action.payload.length > 0) {
        state.genreList = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createNewPlaylistWithSongs.pending, (state) => {
      state.loading = true;
      state.error = null;
    })    
    builder.addCase(createNewPlaylistWithSongs.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { id, href, images, name, isPublic, tracks: trackList, uri } = action.payload
        state = {
          ...state,
          id, href, images, name, isPublic, uri, trackList
        }
      }
    })    
    builder.addCase(createNewPlaylistWithSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })    
  }
});

export const { setTempo, setGenreList } = playlistSlice.actions;

export default playlistSlice.reducer;
