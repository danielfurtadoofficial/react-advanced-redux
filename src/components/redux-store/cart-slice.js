import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      //state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const item = action.payload;
      const existingCartItem = state.items.find(
        (stateItem) => stateItem.id === item.id
      );
      state.changed = true;
      if (!existingCartItem) {
        state.items.push(item);
      } else {
        existingCartItem.amount++;
      }
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingCartItem = state.items.find(
        (stateItem) => stateItem.id === id
      );
      state.changed = true;
      if (existingCartItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existingCartItem.amount--;
      }
    },
  },
});

//GET DATA
export const getCartData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-api-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Getting Cart Data Failed");
      }

      const cart = await response.json();
      dispatch(
        cartSlice.actions.replaceCart({
          items: cart.items || [],
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Http request failed",
        })
      );
    }
  };
};

//PUT DATA
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "sending",
        title: "Sending...",
        message: "Sending http request",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-api-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Http request sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Http request failed",
        })
      );
    }
  };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
