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
        addTourPackageToStore(state, action){
            state.tourPackages.push(action.payload);
        },
        removeTourPackageFromStore(state, action){
            state.tourPackages = state.tourPackages.filter((item) => item._id !== action.payload);
        }
    }
});


export const {setTourPackages, addTourPackageToStore, removeTourPackageFromStore} = tourPackagesSlice.actions;
export default tourPackagesSlice.reducer;