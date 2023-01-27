import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../data/models/Product";

export interface AllProductsSliceType {
  allProducts: Product[];
}

const initialState: AllProductsSliceType = {
  allProducts: [],
};

export const allProductSlice = createSlice({
  name: "allProductSlice",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<AllProductsSliceType>) => {
      state.allProducts = action.payload.allProducts;
    },
  },
});

export const { setAllProducts } = allProductSlice.actions;
