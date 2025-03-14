import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: "false",
    data: "",
    identity: "patient"

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.identity = action.payload.identity;
            console.log(state.identity + " this is identity inside redux store");
        },
        logout: (state) => {
            state.status = false;
            state.identity = "";

        },
        test: (state) => {
            console.log("test sucesful")
        }
    }
})

export const { login, logout, test } = authSlice.actions;

export default authSlice.reducer;