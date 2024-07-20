import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirstAccessTokenApi, getRefreshedAccessTokenApi } from '../apiServices/authService';


export const getFirstAccessToken = createAsyncThunk(
  'auth/getFirstAccessToken',
  async (code, thunkAPI) => {
    try {
      const response = await getFirstAccessTokenApi(code);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRefreshedAccessToken = createAsyncThunk(
  'auth/getRefreshedAccessToken',
  async (refreshToken, thunkAPI) => {
    try {
      const response = await getRefreshedAccessTokenApi(refreshToken);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiryTime: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStore() {
      return initialState
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getRefreshedAccessToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(getRefreshedAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.accessToken) {
        const { accessToken, refreshToken, expiryTime } = action.payload;
        if (expiryTime > Date.now()) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;  
          state.expiryTime = expiryTime;
          //localStorage.setItem('accessToken', accessToken);
          //localStorage.setItem('refreshToken', refreshToken);
          //localStorage.setItem('expiryTime', expiryTime);
        }
       
      }
    })
    builder.addCase(getRefreshedAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(getFirstAccessToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    builder.addCase(getFirstAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.accessToken) {
        const { accessToken, refreshToken , expiryTime} = action.payload;
        if (expiryTime > Date.now()) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken; 
          state.expiryTime = expiryTime;
          //localStorage.setItem('accessToken', accessToken);
          //localStorage.setItem('refreshToken', refreshToken);
          //localStorage.setItem('expiryTime', expiryTime);
        }
        
      }
    })

    builder.addCase(getFirstAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export const { resetAuthStore } = authSlice.actions;
export default authSlice.reducer;
