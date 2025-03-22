import { createSlice } from "@reduxjs/toolkit";

const tourPackagesSlice = createSlice({
    name: "tourPackages",
    initialState:{
        tourPackages: [],
    },
    reducers:{
        setTourPackages(state, action){
            state.tourPackages = action.payload;
        },
    }
});


export const {setTourPackages} = tourPackagesSlice.actions;
export default tourPackagesSlice.reducer;