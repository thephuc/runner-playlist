import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfileApi } from '../apiServices/userService';

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfileApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  userProfile: {
    country: null,
    display_name: null,
    email: null,
    explicit_content: {
      filter_enabled: false,
      filter_locked: false
    },
    external_urls: {
      spotify: null
    },
    followers: {
      href: null,
      total: 0
    },
    href: null,
    id: null,
    images: [
      {
        url: null,
        height: 300,
        width: 300
      }
    ],
    product: null,
    type: null,
    uri: null
  },
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //setUserProfile(state, action) {
    //  state = action.payload;
    //  localStorage.setItem('userProfile', JSON.stringify(action.payload));
    //},
    clearUserProfile() {
      localStorage.removeItem('userProfile');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })   
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
      localStorage.setItem('userProfile', JSON.stringify(action.payload));
    })   
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })    
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
