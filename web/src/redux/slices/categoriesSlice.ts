import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../data/models/Category";

export interface CategoriesType {
  categories: Category[];
}

const initialState: CategoriesType = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoriesType>) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
