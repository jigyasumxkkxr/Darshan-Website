import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token:null
    },
    reducers:{
        setAuth:(state, action) => {
            state.user = action.payload;
        },
        setToken:(state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setAuth, setToken } = authSlice.actions;
export default authSlice.reducer;