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
    //setAccessToken(state, action) {
    //  state.accessToken = action.payload;
    //  localStorage.setItem('accessToken', action.payload);
    //},
    clearAccessToken(state) {
      state.accessToken = null;
      //localStorage.removeItem('accessToken');
    },
    //setRefreshToken(state, action) {
    //  state.refreshToken = action.payload;
    //  localStorage.setItem('refreshToken', action.payload);
    //},
    clearRefreshToken(state) {
      state.refreshToken = null;
      //localStorage.removeItem('refreshToken');
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

export const { setAccessToken, clearAccessToken, setRefreshToken, clearRefreshToken } = authSlice.actions;
export default authSlice.reducer;
