import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverer } from "../../data/models/Deliverer";

export interface AuthenticatedDelivererType {
  deliverer: null | Deliverer;
}

const initialState: AuthenticatedDelivererType = {
  deliverer: null,
};

export const authenticatedDelivererSlice = createSlice({
  name: "authenticatedDelivrer",
  initialState,
  reducers: {
    setAuthenticatedDeliverer: (
      state,
      action: PayloadAction<AuthenticatedDelivererType>
    ) => {
      state.deliverer = action.payload.deliverer;
    },
  },
});

export const { setAuthenticatedDeliverer } =
  authenticatedDelivererSlice.actions;
