import { createSlice } from "@reduxjs/toolkit";
import StockNews from "../models/stock-news-model";

const initialState: StockNews = {
    category: "",
    datetime: "",
    headline: "",
    id: 0,
    image: "",
    related: "",
    source: "",
    summary: "",
    url: ""
};

const marketDataSlice = createSlice({
    name: "marketData",
    initialState,
    reducers: {
        setMarketData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearMarketData: () => {
            return initialState;
        }
    }
});

export const marketData = (state: { marketData: StockNews }) => state.marketData;
export const { setMarketData, clearMarketData } = marketDataSlice.actions;
export default marketDataSlice.reducer;