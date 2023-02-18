import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductAndRelatedInfo from "../../data/models/ProductAndRelatedInfo";

export interface AllProductsSliceType {
  allProducts: ProductAndRelatedInfo[];
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
