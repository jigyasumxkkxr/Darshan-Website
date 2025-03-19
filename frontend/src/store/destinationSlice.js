import { createSlice } from "@reduxjs/toolkit";

const destinationSlice = createSlice({
    name: "destination",
    initialState:{
        destinations:[]
    },
    reducers:{
        setDestinations:(state, action)=> {
            state.destinations = action.payload;
        }
    }
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;