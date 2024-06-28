import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery : ""
}

const searchSlice = createSlice({
    name : "search",
    initialState,
    reducers:{
        searchQueryFunc : (state, action) => {
            state.searchQuery = action.payload.query;
        }
    }
});

export const {searchQueryFunc} = searchSlice.actions;

export default searchSlice.reducer;