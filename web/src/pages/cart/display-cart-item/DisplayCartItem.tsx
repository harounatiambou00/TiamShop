import React from "react";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import CartItem from "../../../data/models/CartItem";
import { Checkbox, IconButton, Rating, Skeleton } from "@mui/material";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";
import ShoppingCart from "../../../data/models/ShoppingCart";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";

import {
  addItemToShoppingCart,
  decrementCartItemQuantity,
  deleteCartItem,
} from "../../../redux/slices/shoppingCartSlice";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";

type Props = {
  cartItem: CartItem;
  selectedCartItems: ShoppingCart;
  setSelectedCartItems: React.Dispatch<React.SetStateAction<ShoppingCart>>;
};
const DisplayCartItem = ({
  cartItem,
  selectedCartItems,
  setSelectedCartItems,
}: Props) => {
  const dispatch = useAppDispatch();
  const [productAndRelatedInfo, setProductAndRelatedInfo] =
    React.useState<ProductAndRelatedInfo>({
      productId: "",
      productReference: "",
      productName: "",
      productDescription: "",
      productPrice: 0,
      productQuantity: 0,
      createdAt: null,
      waranty: "",
      color: "",
      productPrincipalImageId: 0,
      brandId: 0,
      subCategoryId: 0,
      productDiscountId: 0,
      images: [],
      caracteristics: [],
      productDiscountPercentage: 0,
      productDiscountEndDate: null,
      rating: 0,
      numberOfVotes: 0,
    });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getProductAndRelatedInfo = async () => {
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-product-and-all-related-info/" +
        cartItem.productId;
      const response = await fetch(url);
      const content = await response.json();
      if (content.success) {
        let data = content.data as ProductAndRelatedInfo;
        if (data !== null) {
          setProductAndRelatedInfo((currentState) => ({
            ...currentState,
            productId: data.productId,
            productReference: data.productReference,
            productName: data.productName,
            productDescription: data.productDescription,
            productPrice: data.productPrice,
            productQuantity: data.productQuantity,
            createdAt:
              data.createdAt !== null && typeof data.createdAt === "string"
                ? new Date(
                    parseInt(data.createdAt.slice(0, 4)),
                    parseInt(data.createdAt.slice(5, 7)) - 1,
                    parseInt(data.createdAt.slice(8, 10))
                  )
                : null,
            waranty: data.waranty,
            color: data.color,
            productPrincipalImageId: data.productPrincipalImageId,
            brandId: data.brandId,
            subCategoryId: data.subCategoryId,
            productDiscountId: data.productDiscountId,

            images: data.images,
            caracteristics: data.caracteristics,
            productDiscountPercentage: data.productDiscountPercentage,
            productDiscountEndDate: data.productDiscountEndDate,
            rating: data.rating,
            numberOfVotes: data.numberOfVotes,
          }));
        }
      } else {
      }
    };

    //Getting the product
    setIsLoading(true);
    getProductAndRelatedInfo();
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full sm:h-56 lg:h-40 border-t py-3 flex items-start justify-between">
      {isLoading || productAndRelatedInfo.productId === "" ? (
        <Skeleton
          variant="rectangular"
          className="h-5 w-5 rounded-md ml-2 mr-1"
          animation="wave"
        />
      ) : (
        <Checkbox
          checked={
            selectedCartItems.items.find(
              (i) => i.productId === cartItem.productId
            ) !== undefined
          }
          icon={<BiCheckbox className="sm:text-4xl lg:text-2xl" />}
          checkedIcon={<BiCheckboxSquare className="sm:text-4xl lg:text-2xl" />}
          onClick={() => {
            if (
              selectedCartItems.items.find(
                (i) => i.productId === cartItem.productId
              ) !== undefined
            ) {
              setSelectedCartItems({
                items: selectedCartItems.items.filter(
                  (i) => i.productId !== cartItem.productId
                ),
              });
            } else {
              setSelectedCartItems({
                items: [...selectedCartItems.items, cartItem],
              });
            }
          }}
          size="small"
        />
      )}
      {isLoading || productAndRelatedInfo.productId === "" ? (
        <Skeleton
          variant="rectangular"
          className="h-full w-40 rounded-md"
          animation="wave"
        />
      ) : (
        <img
          alt={productAndRelatedInfo.images[0].imageName}
          src={
            "data:" +
            productAndRelatedInfo.images[0].imageExtension +
            ";base64," +
            productAndRelatedInfo.images[0].imageBytes
          }
          className="h-full rounded-md drop-shadow-md"
        />
      )}
      {isLoading || productAndRelatedInfo.productId === "" ? (
        <div className="h-full flex-1 ml-5 pt-5 flex justify-between">
          <div className="">
            <Skeleton
              variant="rectangular"
              className="h-6 w-96 rounded-md"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="h-6 w-60 rounded-md mt-2"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="h-6 w-40 rounded-md mt-2"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              className="h-6 w-20 rounded-md mt-2"
              animation="wave"
            />
          </div>
          <div className="h-full flex flex-col items-end justify-between">
            <Skeleton variant="circular" className="h-9 w-9" animation="wave" />

            <Skeleton
              variant="rectangular"
              className="h-10 w-32 rounded-md mt-2"
              animation="wave"
            />
          </div>
        </div>
      ) : (
        <div className="h-full flex-1 ml-5 pt-2 flex justify-between">
          <div className="">
            <h1 className="font-raleway font-semibold sm:text-2xl lg:text-base">
              {productAndRelatedInfo.productName}
            </h1>
            <p className="sm:text-2xl lg:text-base font-normal">
              {productAndRelatedInfo.productPrice -
                productAndRelatedInfo.productDiscountPercentage *
                  (productAndRelatedInfo.productPrice / 100)}{" "}
              FCFA
            </p>
            <Rating
              value={productAndRelatedInfo.rating}
              readOnly
              size="small"
            />
            {productAndRelatedInfo.productQuantity > 0 ? (
              <div className="px-3 w-fit rounded-full bg-green-100 text-green-700 flex items-center sm:text-xl lg:text-base">
                <HiBadgeCheck className="inline mr-2" /> En stock
              </div>
            ) : (
              <div className="px-3 w-fit rounded-full bg-red-100 text-red-700 flex items-center sm:text-xl lg:text-base">
                <HiBadgeCheck className="inline mr-2" /> Sur commande
              </div>
            )}
          </div>
          <div className="h-full flex flex-col items-end justify-between">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(deleteCartItem({ productId: cartItem.productId }));
              }}
            >
              <AiOutlineDelete className="sm:text-4xl lg:text-xl" />
            </IconButton>

            <div className="px-2 py-2 rounded-md drop-shadow-sm ">
              <label
                htmlFor=""
                className="font-normal sm:text-3xl lg:text-base"
              >
                Quantité
              </label>
              <div className="w-fit flex items-center">
                <input
                  type="number"
                  className="bg-white outline-none border-2 border-primary sm:w-24 sm:h-16 lg:w-14 lg:h-10 rounded-l-md sm:text-3xl lg:text-xl font-normal text-center"
                  value={cartItem.quantity}
                  onChange={(e) => {}}
                />
                <div className="bg-white lg:h-10 sm:h-16 border-y-2 border-r-2 border-primary rounded-r-md  flex items-center justify-between">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      dispatch(
                        decrementCartItemQuantity({
                          productId: cartItem.productId,
                        })
                      );
                    }}
                  >
                    <AiOutlineMinus className="sm:text-3xl lg:text-base" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    className="sm:ml-5 lg:ml-2"
                    onClick={() => {
                      dispatch(
                        addItemToShoppingCart({
                          productId: cartItem.productId,
                        })
                      );
                    }}
                  >
                    <AiOutlinePlus className="sm:text-3xl lg:text-base" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayCartItem;
