import { configureStore } from "@reduxjs/toolkit";
import stockDataSlice from "../features/stockData";

const store = configureStore({
    reducer: {
        // Add your reducers here
        stockData: stockDataSlice,
        // marketData: marketDataSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;