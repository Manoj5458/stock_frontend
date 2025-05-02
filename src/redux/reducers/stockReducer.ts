
import { UPDATE_STOCK_DATA } from "../actions/stockActions";

const initialState = {
  stockData: null,
};

export const stockReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_STOCK_DATA:
      return {
        ...state,
        stockData: action.payload,
      };
    default:
      return state;
  }
};