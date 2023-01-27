import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubCategory } from "../../data/models/SubCategory";

export interface SubCategoriesType {
  subCategories: SubCategory[];
}

const initialState: SubCategoriesType = {
  subCategories: [],
};

export const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    setSubCategories: (state, action: PayloadAction<SubCategoriesType>) => {
      state.subCategories = action.payload.subCategories;
    },
  },
});

export const { setSubCategories } = subCategoriesSlice.actions;
