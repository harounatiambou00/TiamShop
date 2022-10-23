import { configureStore } from "@reduxjs/toolkit";
import { authenticatedAdminSlice } from "./slices/authenticatedAdminSlice";
import { authenticatedClientSlice } from "./slices/authenticatedClientSlice";

export const store = configureStore({
  reducer: {
    authenticatedClient: authenticatedClientSlice.reducer,
    authenticatedAdmin: authenticatedAdminSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//The RootState will help us to spaecify the state type so that typescript won't complain
export type RootState = ReturnType<typeof store.getState>;
//The RootState will help us to specify the dispatch type so that typescript won't complain
export type AppDispatch = typeof store.dispatch;
