
export const UPDATE_STOCK_DATA = "UPDATE_STOCK_DATA";

export const updateStockData = (data: any) => ({
  type: UPDATE_STOCK_DATA,
  payload: data,
});