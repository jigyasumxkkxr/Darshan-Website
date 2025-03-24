import { setConversionRate, setCurrency } from "@/store/currencySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const currencies = [
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
];

export default function CurrencySelector() {
    const dispatch = useDispatch();
    const {currency} = useSelector(state=> state.currency);


  return (
    <div className="relative w-fit">
      <select
        className="w-full px-1 border font-semibold rounded-md py-1 text-sm appearance-none cursor-pointer bg-white focus:outline-none"
        onChange={(e) => {
          const newCurrency = currencies.find((c) => c.code === e.target.value);
          dispatch(setCurrency(newCurrency.code));
        }}
        value={currency}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code} >
            {currency.flag} {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
}
