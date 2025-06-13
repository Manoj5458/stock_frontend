import { createSlice } from "@reduxjs/toolkit";
import StockData from "../models/stock-model";

const initialState: StockData = {
    companyName: "",
    companyCode: "",
    about: "",
    marketCap: "",
    currentPrice: "",
    highPrice: "",
    lowPrice: "",
    bookValue: "",
    dividendYield: "",
    roe: "",
    roce: "",
    faceValue: "",
    pe: "",
    netProfitQuarter: [],
    netProfitYear: [],
    stockScore: 0
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

export const marketData = (state: { stockData: StockData }) => state.stockData;
export const { setStockData, clearStockData } = stockDataSlice.actions;
export default stockDataSlice.reducer;