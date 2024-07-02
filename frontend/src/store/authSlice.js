import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "",  
    data: "",
    identity: ""

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
            
           
        },
        test:(state) => {
            console.log("test sucesful")
        }
    }
})

export const { login, logout,test } = authSlice.actions;

export default authSlice.reducer;