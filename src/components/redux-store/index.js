import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./ui-slice";
import cartSliceReducer from "./cart-slice";

const store = configureStore({
  reducer: { cart: cartSliceReducer, ui: uiSliceReducer },
});

export default store;
