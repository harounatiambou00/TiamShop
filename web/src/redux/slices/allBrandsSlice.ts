import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "../../data/models/Brand";

export interface AllBrandsType {
  brands: Brand[];
}

const initialState: AllBrandsType = {
  brands: [],
};

export const allBrandsSlice = createSlice({
  name: "allBrandSlice",
  initialState,
  reducers: {
    setAllBrands: (state, action: PayloadAction<AllBrandsType>) => {
      state.brands = action.payload.brands;
    },
  },
});

export const { setAllBrands } = allBrandsSlice.actions;
