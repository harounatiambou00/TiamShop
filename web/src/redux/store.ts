import { configureStore } from "@reduxjs/toolkit";
import { authenticatedAdminSlice } from "./slices/authenticatedAdminSlice";
import { authenticatedClientSlice } from "./slices/authenticatedClientSlice";
import { categoriesSlice } from "./slices/categoriesSlice";
import { subCategoriesSlice } from "./slices/subCategoriesSlice";
import { currentProductSlice } from "./slices/currentProductSlice";
import { allBrandsSlice } from "./slices/allBrandsSlice";
import { shoppingCartSlice } from "./slices/shoppingCartSlice";
import { authenticatedDelivererSlice } from "./slices/authenticatedDelivererSlice";
import { orderToBeMadeSlice } from "./slices/orderToBeMadeSlice";
import { globalLoadingSlice } from "./slices/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    authenticatedClient: authenticatedClientSlice.reducer,
    authenticatedAdmin: authenticatedAdminSlice.reducer,
    categories: categoriesSlice.reducer,
    subCategories: subCategoriesSlice.reducer,
    currentProduct: currentProductSlice.reducer,
    allBrands: allBrandsSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    authenticatedDeliverer: authenticatedDelivererSlice.reducer,
    orderToBeMade: orderToBeMadeSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//The RootState will help us to spaecify the state type so that typescript won't complain
export type RootState = ReturnType<typeof store.getState>;
//The RootState will help us to specify the dispatch type so that typescript won't complain
export type AppDispatch = typeof store.dispatch;
