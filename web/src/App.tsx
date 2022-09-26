import { Button } from "@mui/material";
import React from "react";
import "./App.css";

//Pages
import {
  AboutUsPage,
  AccountPage,
  CartPage,
  CategoriesPage,
  CompareProductsPage,
  ContactUsPage,
  DeliveryInformationPage,
  Error404,
  GiveOrderInfoPage,
  HomePage,
  OrderPage,
  OrderCongratulationsPage,
  PolicyPage,
  ProductDetailsPage,
  RepaymentPage,
  SearchResultsPage,
  SignInPage,
  SignUpPage,
  UserFavoriteProductsPage,
  UserOrdersPage,
  UserPaymentReceipts,
} from "./pages";

//components
import { Header } from "./components";

function App() {
  return (
    <div id="app" className="w-full h-screen bg-background">
      <Header />
      <Button color="warning" variant="contained">
        Hello
      </Button>
    </div>
  );
}

export default App;
