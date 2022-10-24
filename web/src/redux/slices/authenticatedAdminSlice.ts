import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../../data/models";

export interface AuthenticatedAdminType {
  admin: null | Admin;
}

const initialState: AuthenticatedAdminType = {
  admin: null,
};

export const authenticatedAdminSlice = createSlice({
  name: "authenticatedAdmin",
  initialState,
  reducers: {
    setAuthenticatedAdmin: (
      state,
      action: PayloadAction<AuthenticatedAdminType>
    ) => {
      state.admin = action.payload.admin;
    },
  },
});

export const { setAuthenticatedAdmin } = authenticatedAdminSlice.actions;
