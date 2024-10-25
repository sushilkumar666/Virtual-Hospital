import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    status: "false",  
    data: "",
    identity: "patient"

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.status = true;
            state.identity = action.payload.identity;

        },
        logout: (state) => {
            state.status = false;
            state.identity = "";
            cookies.remove('accessToken');
        },
        test:(state) => {
            console.log("test sucesful")
        }
    }
})

export const { login, logout,test } = authSlice.actions;

export default authSlice.reducer;