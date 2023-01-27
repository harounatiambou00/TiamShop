import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../data/models/Product";

export interface CurrentProductSliceType {
  currentProduct: Product | null;
}

const initialState: CurrentProductSliceType = {
  currentProduct: null,
};

export const currentProductSlice = createSlice({
  name: "currentProductSlice",
  initialState,
  reducers: {
    setCurrentProduct: (
      state,
      action: PayloadAction<CurrentProductSliceType>
    ) => {
      state.currentProduct = action.payload.currentProduct;
    },
  },
});

export const { setCurrentProduct } = currentProductSlice.actions;
