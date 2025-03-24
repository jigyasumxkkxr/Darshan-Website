import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currency: "INR",
        conversionRate: {},
        currencySymbols: {
            "INR": "₹",
            "USD": "$",
            "GBP": "£",
            "AED": "د.إ",
            "THB": "฿",
            "EUR": "€",
            "JPY": "¥",
            "CAD": "C$",
            "AUD": "A$",
            "CNY": "¥",
        }
    },
    reducers: {
        setCurrency(state, action) {
            state.currency = action.payload;
            },
        setConversionRate: (state, action) => {
            state.conversionRate = action.payload;
        }
    }
});

export const { setCurrency, setConversionRate } = currencySlice.actions;
export default currencySlice.reducer;