import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import searchSlice from './searchSlice';
import optionSlice from './optionSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        search : searchSlice,
        option : optionSlice

        //TODO: add more slices here for posts
    }
});


export default store;