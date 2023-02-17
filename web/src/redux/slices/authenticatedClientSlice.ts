import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../data/models";

export interface AuthenticatedClientType {
  client: null | Client;
}

const initialState: AuthenticatedClientType = {
  client: null,
};

export const authenticatedClientSlice = createSlice({
  name: "authenticatedClient",
  initialState,
  reducers: {
    setAuthenticatedClient: (
      state,
      action: PayloadAction<AuthenticatedClientType>
    ) => {
      state.client = action.payload.client;
    },
  },
});

export const { setAuthenticatedClient } = authenticatedClientSlice.actions;
