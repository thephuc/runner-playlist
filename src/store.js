import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {thunk} from 'redux-thunk';

import authReducer from './redux/authSlice';
import trackReducer from './redux/trackSlice';
import userReducer from './redux/userSlice';
import playlistReducer from './redux/playlistSlice';
import searchReducer from './redux/searchSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  track: trackReducer,
  user: userReducer,
  playlist: playlistReducer,
  search: searchReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ... getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  ]
   
});

export const persistor = persistStore(store);

export default store;