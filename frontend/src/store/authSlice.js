import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
    userData: null,
    identity: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.identity = action.payload.identity;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.identity = "";
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;