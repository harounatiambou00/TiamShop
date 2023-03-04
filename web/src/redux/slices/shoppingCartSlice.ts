import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ShoppingCart from "../../data/models/ShoppingCart";
import CartItem from "../../data/models/CartItem";
import React from "react";
import moment from "moment";

const shoppingCartStringInlocalStorage = localStorage.getItem("shoppingCart");

const initialState = {
  items: shoppingCartStringInlocalStorage
    ? (JSON.parse(shoppingCartStringInlocalStorage).items as CartItem[])
    : ([] as CartItem[]),
} as ShoppingCart;

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setShoppingCart: (state, action: PayloadAction<ShoppingCart>) => {
      state.items = action.payload.items;
      localStorage.setItem("shoppingCart", JSON.stringify(state));
    },
    selectShoppingCart: (state) => state,
    addItemToShoppingCart: (
      state,
      action: PayloadAction<{
        productId: string;
        setOpenSuccessSnackbar?: React.Dispatch<React.SetStateAction<boolean>>;
      }>
    ) => {
      const itemIndex = state.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
        state.items[itemIndex].lastUpdate = new Date();
        localStorage.setItem("shoppingCart", JSON.stringify(state));
        action.payload.setOpenSuccessSnackbar &&
          action.payload.setOpenSuccessSnackbar(true);
      } else {
        state.items.push({
          productId: action.payload.productId,
          quantity: 1,
          lastUpdate: moment().toDate(),
          addedAt: moment().toDate(),
        });
        localStorage.setItem("shoppingCart", JSON.stringify(state));
        action.payload.setOpenSuccessSnackbar &&
          action.payload.setOpenSuccessSnackbar(true);
      }
    },
    decrementCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
      }>
    ) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      const itemIndex = state.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (item !== undefined) {
        if (item.quantity > 1) state.items[itemIndex].quantity -= 1;
        else {
          state.items = state.items.filter(
            (i) => i.productId !== item.productId
          );
        }

        localStorage.setItem("shoppingCart", JSON.stringify(state));
      }
    },
    deleteCartItem: (
      state,
      action: PayloadAction<{
        productId: string;
      }>
    ) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item !== undefined) {
        state.items = state.items.filter((i) => i.productId !== item.productId);
        localStorage.setItem("shoppingCart", JSON.stringify(state));
      }
    },
  },
});

export const {
  setShoppingCart,
  addItemToShoppingCart,
  deleteCartItem,
  decrementCartItemQuantity,
} = shoppingCartSlice.actions;
