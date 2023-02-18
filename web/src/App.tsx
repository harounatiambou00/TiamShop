import React from "react";

import { Routes, Route } from "react-router-dom";

//Visitor&Client Pages
import {
  AboutUsPage,
  AccountPage,
  CartPage,
  CategoriesPage,
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
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  AccountDetails,
  AccountSettings,
  CategoryPage,
  SubCategoryPage,
} from "./pages";

//layouts
import { Layout, AdminLayout } from "./_layouts";

//AdminPages
import {
  AdminApp,
  AdminSignInPage,
  Dashboard,
  ClientsPage,
  BrandsPage,
  AdminCategoryPage,
  ProductsPage,
} from "./admin-pages";

import "./App.css";
import { Client } from "./data/models";
import { useAppDispatch } from "./hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedClient } from "./redux/slices/authenticatedClientSlice";
import { setCategories } from "./redux/slices/categoriesSlice";
import { Category } from "./data/models/Category";
import { Product } from "./data/models/Product";
import { setAllProducts } from "./redux/slices/allProductsSlice";
import { Brand } from "./data/models/Brand";
import { SubCategory } from "./data/models/SubCategory";
import { setSubCategories } from "./redux/slices/subCategoriesSlice";
import { setAllBrands } from "./redux/slices/allBrandsSlice";
import { CustomImage } from "./data/models/Image";
import { setImages } from "./redux/slices/imagesSlice";

function App() {
  const dispatch = useAppDispatch();

  //Get The authenticated client
  React.useEffect(() => {
    const getAuthenticatedClient = async () => {
      let url = process.env.REACT_APP_API_URL + "auth/get-logged-client";
      let response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      let content = await response.json();
      if (content) {
        if (content.success) {
          let data = content.data;

          let client: Client = {
            userId: data.userId,
            FirstName: data.firstName,
            LastName: data.lastName,
            Email: data.email,
            PhoneNumber: data.phoneNumber,
            CompleteAddress: data.completeAddress,
            BirthDate:
              //if the birthday is not null we create a date object by slicing the string because .net datetime and typescript date don't match
              data.birthDate != null
                ? new Date(
                    parseInt(data.birthDate.slice(0, 4)),
                    parseInt(data.birthDate.slice(5, 7)) - 1,
                    parseInt(data.birthDate.slice(8, 10))
                  )
                : null,
            NeighborhoodId: data.neighborhoodId,
          };

          dispatch(setAuthenticatedClient({ client: client }));
        } else {
          dispatch(setAuthenticatedClient({ client: null }));
        }
      }
    };
    getAuthenticatedClient();
  });

  //Get all the products
  React.useEffect(() => {
    const getProducts = async () => {
      let url = process.env.REACT_APP_API_URL + "products/get-all-products";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let products = [] as Product[];
        let data = content.data;
        for (let i of data) {
          products = [
            ...products,
            {
              ...{},
              productId: i.productId,
              productReference: i.productReference,
              productName: i.productName,
              productDescription: i.productDescription,
              productPrice: i.productPrice,
              productQuantity: i.productQuantity,
              createdAt: i.createdAt,
              waranty: i.waranty,
              color: i.color,
              productPrincipalImageId: i.productPrincipalImageId,
              brandId: i.brandId,
              subCategoryId: i.subCategoryId,
              productDiscountId: i.productDiscountId,
            },
          ];
        }

        dispatch(setAllProducts({ allProducts: products }));
      } else {
        dispatch(setAllProducts({ allProducts: [] }));
      }
    };
    getProducts();
  }, []);

  //Get The categories
  React.useEffect(() => {
    const getCategories = async () => {
      const url = process.env.REACT_APP_API_URL + "categories";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data;
        let categories: Category[] = [];
        for (let i of data) {
          categories.push({
            ...{},
            CategoryId: i.categoryId,
            CategoryName: i.categoryName,
            CategoryTitle: i.categoryTitle,
            CategoryImageId: i.categoryImageId,
            CategoryRanking: i.categoryRanking,
          });
        }
        dispatch(setCategories({ categories }));
      } else {
        dispatch(setCategories({ categories: [] }));
      }
    };
    getCategories();
  }, []);

  //Get The sub-categories
  React.useEffect(() => {
    const getSubCategories = async () => {
      const url = process.env.REACT_APP_API_URL + "sub-categories";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let subCategories = [] as SubCategory[];
        let data = content.data;
        for (let i of data) {
          subCategories = [
            ...subCategories,
            {
              ...{},
              SubCategoryId: i.subCategoryId,
              SubCategoryName: i.subCategoryName,
              SubCategoryTitle: i.subCategoryTitle,
              SubCategoryImageId: i.subCategoryImageId,
              SubCategoryRanking: i.subCategoryRanking,
              CategoryId: i.categoryId,
            },
          ];
        }
        dispatch(setSubCategories({ subCategories }));
      }
    };
    getSubCategories();
  }, []);

  //Get The brands
  React.useEffect(() => {
    const getBrands = async () => {
      const url = process.env.REACT_APP_API_URL + "brands";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let brands = [] as Brand[];
        let data = content.data;
        for (let i of data) {
          brands.push({
            ...{},
            brandId: i.brandId,
            BrandName: i.brandName,
            PartnershipDate:
              i.partnershipDate != null
                ? new Date(
                    parseInt(i.partnershipDate.slice(0, 4)),
                    parseInt(i.partnershipDate.slice(5, 7)) - 1,
                    parseInt(i.partnershipDate.slice(8, 10))
                  )
                : null,
            BrandWebsiteLink: i.brandWebsiteLink,
            BrandImageId: i.brandImageId,
          });
        }
        dispatch(setAllBrands({ brands }));
      }
    };
    getBrands();
  }, []);

  //Get The brands
  React.useEffect(() => {
    const getImages = async () => {
      const url = process.env.REACT_APP_API_URL + "images";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let images = [] as CustomImage[];
        let data = content.data as CustomImage[];
        for (let i of data) {
          images.push({
            ...{},
            imageId: i.imageId,
            imageName: i.imageName,
            imageDescription: i.imageDescription,
            imageBytes: i.imageBytes,
            imageExtension: i.imageExtension,
            imageSize: i.imageSize,
          });
        }
        dispatch(setImages({ images }));
      }
    };
    getImages();
  }, []);

  return (
    <div
      id="app"
      className="w-full bg-background font-kanit font-light text-gray-800"
    >
      <Routes>
        {/**
         * Simple user part of the platform
         */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/*On this page a visitor will know about the company */}
          <Route path="about-us" element={<AboutUsPage />} />
          {/*On this page a visitor will be able to get in touch with us */}
          <Route path="contact-us" element={<ContactUsPage />} />
          {/*On this page a visitor can have more information about the product with the specified id */}
          <Route
            path="product-details/:productId"
            element={<ProductDetailsPage />}
          />
          {/*On this page a visitor can have more information about our delivery policy */}
          <Route path="delivery-info" element={<DeliveryInformationPage />} />
          {/*On this page a visitor can have more information about the terms and conditions of our platform */}
          <Route path="policy" element={<PolicyPage />} />
          {/*On this page the client with the specified id can see, update, or delete his account*/}
          <Route path="account/:clientId" element={<AccountPage />}>
            <Route path="" element={<AccountDetails />} />
            {/*On this page a client will see the products he added to his favorites */}
            <Route path="my-favorites" element={<UserFavoriteProductsPage />} />
            {/*On this page a client will can have access to all his payment receipts */}
            <Route path="my-receipts" element={<UserPaymentReceipts />} />
            {/*On this page a client will can have access to all his orders and their status */}
            <Route path="my-orders" element={<UserOrdersPage />} />
            <Route path="my-settings" element={<AccountSettings />} />
          </Route>
          {/*On this page a visitor can see all our product categories */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route
            path="sub-category/:subCategoryName"
            element={<SubCategoryPage />}
          />
          {/*On this page a client will see his cart, update it, or make an order */}
          <Route path="cart/:cartId" element={<CartPage />} />

          {/*On this page a visitor can see all the products matching his research and filter them */}
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="order" element={<OrderPage />} />
          {/*On this page a client will can ask for repayment */}
          <Route path="repayment" element={<RepaymentPage />} />
          {/*On this page we will vc an order */}
          <Route path="order-congrats" element={<OrderCongratulationsPage />} />
          {/*On this page a client will can finalize his order process */}
          <Route path="finalize-order" element={<GiveOrderInfoPage />} />
        </Route>
        {/*On this page a client can login*/}
        <Route path="sign-in" element={<SignInPage />} />
        {/*On this page a visitor can create an account */}
        <Route path="sign-up" element={<SignUpPage />} />
        {/* */}
        <Route path="verify-email/:token" element={<VerifyEmail />} />
        {/* */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        {/* */}
        <Route path="reset-password/:token" element={<ResetPassword />} />

        {/**
         * admin user part of the platform
         * Any time you come here you have to login
         */}
        <Route path="admin" element={<AdminApp />}>
          {/*On this page an admin can monitor the platform */}
          <Route path="" element={<AdminLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="categories" element={<AdminCategoryPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>
        </Route>
        {/*On this page an admin can login*/}
        <Route path="admin-sign-in" element={<AdminSignInPage />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
