import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalLoadingType {
  isLoading: boolean;
}

const initialState: GlobalLoadingType = {
  isLoading: false,
};

export const globalLoadingSlice = createSlice({
  name: "globalLoadingSlice",
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<GlobalLoadingType>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;
