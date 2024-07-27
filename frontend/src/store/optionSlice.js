import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   open : false

}

const optionSlice = createSlice({
    name: "option",
    initialState,
    reducers: {
        optionClose: (state,action) => {
            console.log("opiton clsoe i callsed")
            state.open = false;
        },

        optionOpen : (state, action) => {
            state.open = true;
        }
        
    }
})

export const { optionOpen, optionClose } = optionSlice.actions;

export default optionSlice.reducer;