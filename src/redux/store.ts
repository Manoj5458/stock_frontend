
import { createStore, combineReducers } from "redux";
import { stockReducer } from "./reducers/stockReducer";

const rootReducer = combineReducers({
  stock: stockReducer,
  // ...other reducers
});

const store = createStore(rootReducer);

export default store;