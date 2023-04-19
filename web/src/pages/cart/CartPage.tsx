import React from "react";
import Breadcumb from "./breadcumb/Breadcumb";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { Alert, Button, Checkbox } from "@mui/material";
import { BsCartCheck } from "react-icons/bs";
import DisplayCartItem from "./display-cart-item/DisplayCartItem";
import ShoppingCart from "../../data/models/ShoppingCart";
import ProductAndRelatedInfo from "../../data/models/ProductAndRelatedInfo";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setShoppingCart } from "../../redux/slices/shoppingCartSlice";
import { BiCheckbox, BiCheckboxSquare, BiCommentError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CreateOrderLineDTO from "../../data/models/CreateOrderLineDTO";
import { setOrderToBeMade } from "../../redux/slices/orderToBeMadeSlice";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let shoppingCart = useAppSelector(
    (state: RootState) => state.shoppingCart
  ) as ShoppingCart;
  let allProducts = [] as ProductAndRelatedInfo[];
  const [selectedCartItems, setSelectedCartItems] =
    React.useState<ShoppingCart>(shoppingCart);

  React.useEffect(() => {
    setSelectedCartItems(shoppingCart);
  }, [shoppingCart]);

  const [summaryValues, setSummayValues] = React.useState<{
    numberOfProducts: number;
    totalExpensesPrice: number;
    deliveryPrice: number;
    taxes: number;
  }>({
    numberOfProducts: selectedCartItems.items.length,
    totalExpensesPrice: 0,
    deliveryPrice: 0,
    taxes: 0,
  });
  React.useEffect(() => {
    let totalExpenses = 0;
    for (let item of selectedCartItems.items) {
      let product = allProducts.find((pr) => pr.productId === item.productId);
      if (product !== undefined)
        totalExpenses +=
          (product.productPrice -
            product.productPrice * (product.productDiscountPercentage / 100)) *
          item.quantity;
    }
    setSummayValues((s) => ({
      ...s,
      numberOfProducts: selectedCartItems.items.length,
      totalExpensesPrice: totalExpenses,
      deliveryPrice: totalExpenses > 500000 ? 0 : 1000,
      taxes: 0,
    }));
  }, [selectedCartItems, allProducts]);
  return (
    <div className="min-h-screen w-full p-5">
      <Breadcumb />
      <div className="w-full sm:mt-10 lg:mt-5 px-2">
        <h1 className="font-raleway font-semibold text-primary sm:text-5xl lg:text-2xl uppercase">
          Mon panier
        </h1>
        {shoppingCart.items.length > 0 ? (
          <div className="grid grid-cols-12 gap-10 w-full sm:mt-5 lg:mt-2">
            <div className="sm:col-span-12 lg:col-span-7 sm:order-last lg:order-first">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Checkbox
                    checked={
                      selectedCartItems.items.length ===
                      shoppingCart.items.length
                    }
                    icon={<BiCheckbox className="sm:text-5xl lg:text-3xl" />}
                    checkedIcon={
                      <BiCheckboxSquare className="sm:text-5xl lg:text-3xl" />
                    }
                    onClick={() => setSelectedCartItems(shoppingCart)}
                  />
                  <span className="font-kanit font-light sm:text-2xl lg:text-base">
                    Tout selectionner
                  </span>
                </div>
                <Button
                  color="error"
                  endIcon={
                    <AiOutlineDelete className="sm:text-4xl lg:text-base" />
                  }
                  className="normal-case font-kanit font-light h-fit sm:text-3xl lg:text-base"
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    dispatch(setShoppingCart({ items: [] }));
                  }}
                >
                  Vider le panier
                </Button>
              </div>
              {shoppingCart.items.map((item, index) => (
                <DisplayCartItem
                  key={item.productId}
                  cartItem={item}
                  selectedCartItems={selectedCartItems}
                  setSelectedCartItems={setSelectedCartItems}
                />
              ))}
            </div>
            <div className="rounded-md bg-slate-100 sm:col-span-12 lg:col-span-5 px-8 sm:py-7 lg:py-3 drop-shadow-md h-fit sm:mt-5 lg:mt-0 sm:order-first lg:order-last">
              <h1 className="font-raleway font-bold text-primary sm:text-3xl lg:text-xl">
                Apeçu de la commande
              </h1>
              <div className="flex justify-between items-center w-full mt-5 pt-1 px-3 ">
                <p className="sm:text-2xl lg:text-lg">Nombre de produits</p>
                <p className="sm:text-2xl lg:text-lg">
                  {summaryValues.numberOfProducts}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-t pt-1 px-3 border-gray-200">
                <p className="sm:text-2xl lg:text-lg">Montant total dépensé</p>
                <p className="sm:text-2xl lg:text-lg">
                  {summaryValues.totalExpensesPrice} FCFA
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-t pt-1 px-3 border-gray-200">
                <p className="sm:text-2xl lg:text-lg">Livraison</p>
                <p className="sm:text-2xl lg:text-lg">
                  {summaryValues.deliveryPrice} FCFA
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-t pt-1 px-3 border-gray-200">
                <p className="sm:text-2xl lg:text-lg">Taxes</p>
                <p className="sm:text-2xl lg:text-lg">0 FCFA</p>
              </div>
              <div className="flex justify-between items-center w-full mt-5 border-t-2 pt-1 px-3 border-primary">
                <p className="font-normal uppercase sm:text-2xl lg:text-lg">
                  Total à payer
                </p>
                <p className="font-normal sm:text-2xl lg:text-lg">
                  {summaryValues.totalExpensesPrice +
                    summaryValues.deliveryPrice}{" "}
                  FCFA
                </p>
              </div>
              <Button
                variant="contained"
                className={
                  selectedCartItems.items.length === 0
                    ? "bg-gray-200 mt-10 text-gray-400 sm:text-3xl lg:text-lg font-kanit font-normal"
                    : "bg-amber-400 mt-10 text-primary sm:text-3xl lg:text-lg font-kanit font-normal"
                }
                endIcon={
                  <BsCartCheck className="ml-5 sm:text-4xl lg:text-xl" />
                }
                disabled={selectedCartItems.items.length === 0}
                onClick={() => {
                  dispatch(
                    setOrderToBeMade({
                      ordererFirstName: "",
                      ordererLastName: "",
                      ordererEmail: "",
                      ordererPhoneNumber: "",
                      ordererCompleteAddress: "",
                      clientId: null,
                      neighborhoodId: 0,
                      lines: selectedCartItems.items.map(
                        (i, index) =>
                          ({
                            quantity: i.quantity,
                            productId: i.productId,
                            orderId: 0,
                          } as CreateOrderLineDTO)
                      ),
                    })
                  );
                  navigate("/finalize-order");
                }}
              >
                Finaliser la commande
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full sm:h-128 lg:h-96 flex flex-col items-center justify-center">
            <Alert
              severity="error"
              className="sm:text-4xl lg:text-xl font-kanit items-center font-light"
              icon={<BiCommentError className="sm:text-6xl lg:text-4xl" />}
            >
              Votre panier malheuresement est vide.
            </Alert>
            <div className="sm:mt-10 lg:mt-5 flex sm:flex-col lg:flex-row items-center">
              <Button
                variant="contained"
                className="bg-amber-400 font-kanit font-light text-primary sm:text-3xl lg:text-sm"
                onClick={() => navigate("/categories")}
              >
                Faites le tour de nos rayons
              </Button>
              <Button
                variant="outlined"
                className="font-kanit font-light text-primary sm:mt-5 lg:mt-0 sm:ml-0 lg:ml-5 sm:text-3xl lg:text-sm"
                onClick={() => navigate("/best-sellers")}
              >
                Qu'est-ce qui se s'achete le plus sur Tiamshop ?
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
