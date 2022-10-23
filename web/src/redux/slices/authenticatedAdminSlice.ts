import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "../../data/models";

interface StateType {
  client: null | Admin;
  isLoading: boolean;
}

const initialState = {
  client: null,
  isLoading: false,
};

export const authenticatedAdminSlice = createSlice({
  name: "authenticatedAdmin",
  initialState,
  reducers: {
    setAuthenticatedAdmin: (
      state,
      action: { type: string; payload: StateType }
    ) => {},
    logout: (state, action: { type: string }) => {},
    refresh: (state, action: { type: string }) => {},
  },
});
