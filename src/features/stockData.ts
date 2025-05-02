import { createSlice } from "@reduxjs/toolkit";
import StockData from "../models/stock-model";

const initialState: StockData = {
    marketCap: "",
    currentPrice: "",
    highPrice: "",
    netProfitQuarter: [],
    netProfitYear: []
};

const stockDataSlice = createSlice({
    name: "stockData",
    initialState,
    reducers: {
        setStockData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearStockData: () => {
            return initialState;
        }
    }
});

export const { setStockData, clearStockData } = stockDataSlice.actions;