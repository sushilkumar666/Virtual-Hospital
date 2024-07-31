// import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import searchSlice from './searchSlice';
import optionSlice from './optionSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'search', 'option'] // Add slices you want to persist here
  };

  const rootReducer = combineReducers({
    auth: authSlice,
    search: searchSlice,
    option: optionSlice
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types as redux-persist uses non-serializable data
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/FLUSH', 'persist/REGISTER'],
        },
      }),
    // devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);

  export { store, persistor };