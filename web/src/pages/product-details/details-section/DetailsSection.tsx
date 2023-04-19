import React from "react";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { Button, Skeleton } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { GiShoppingCart } from "react-icons/gi";
import { AnimatedButton } from "../../../components/core";
import { BsStar, BsStarFill } from "react-icons/bs";
import RateProductDialog from "./rate-product-dialog/RateProductDialog";
import CreateOrderLineDTO from "../../../data/models/CreateOrderLineDTO";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { setOrderToBeMade } from "../../../redux/slices/orderToBeMadeSlice";
import { addItemToShoppingCart } from "../../../redux/slices/shoppingCartSlice";
import { CustomImage } from "../../../data/models/Image";

type Props = {
  product: ProductAndRelatedInfo;
};

const Stars = ({ grade }: { grade: number }) => {
  if (grade < 0 || grade > 5)
    return (
      <div className="flex items-center">
        <span className="font-medium text-md text-gray-600 mr-1">{grade}</span>
        {[1, 2, 3, 4, 5].map((i) => (
          <BsStar key={i} className="text-yellow-500 text-lg mr-1" />
        ))}
      </div>
    );
  else {
    let round = grade.toFixed();

    return (
      <div className="flex items-center">
        <span className="font-medium text-md text-gray-600 mr-1">{grade}</span>
        {[1, 2, 3, 4, 5].map((i) => {
          if (i <= Number(round))
            return (
              <BsStarFill key={i} className="text-yellow-500 text-lg mr-1" />
            );
          else {
            return <BsStar key={i} className="text-yellow-500 text-lg mr-1" />;
          }
        })}
      </div>
    );
  }
};

const DetailsSection = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const brand = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ).find((i) => i.brandId === product.brandId);

  const [brandImage, setBrandImage] = React.useState<CustomImage | undefined>(
    undefined
  );
  const [openRateProductDialog, setOpenRateProductDialog] =
    React.useState<boolean>(false);
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  if (brandImage === undefined) {
    return <Skeleton />;
  }

  return (
    <div className="w-full h-full px-6 py-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-amita sm:text-6xl lg:text-4xl text-red-600">
            {product.productDiscountPercentage !== undefined &&
            product.productDiscountPercentage !== 0
              ? product.productPrice -
                product.productPrice * (product.productDiscountPercentage / 100)
              : product.productPrice}{" "}
            <span className="font-raleway">FCFA</span>
          </h1>
          {product.productDiscountPercentage !== undefined &&
            product.productDiscountPercentage !== 0 && (
              <span className="text-gray-400 sm:text-3xl lg:text-xl font-amita line-through">
                {product.productPrice} fcfa
              </span>
            )}
        </div>
        {brandImage !== undefined && (
          <img
            alt={brandImage.imageName}
            src={
              "data:" +
              brandImage.imageExtension +
              ";base64," +
              brandImage.imageBytes
            }
            className="sm:h-32 lg:h-24"
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <div
          className={
            authenticatedClient !== null
              ? "bg-amber-50 px-4 py-1 rounded-sm drop-shadow-sm cursor-pointer "
              : "bg-amber-50 px-4 py-1 rounded-sm drop-shadow-sm"
          }
          onClick={() =>
            authenticatedClient !== null && setOpenRateProductDialog(true)
          }
        >
          <Stars grade={product.rating} />
          <div className="w-full flex items-center justify-between mt-2">
            <small className="text-gray-500">
              {product.numberOfVotes} votes
            </small>
            <small className="text-gray-500">15 ventes</small>
          </div>
        </div>
        <div>
          {product.productPrice > 500000 && (
            <span className="bg-green-100 text-green-900 px-2 rounded-full drop-shadow-sm sm:text-xl lg:text-sm">
              Livraison gratuite
            </span>
          )}
          {product.productQuantity <= 20 && (
            <span className="bg-red-100 text-red-700 px-2 rounded-full drop-shadow-sm sm:text-xl lg:text-sm ml-4">
              Faites vite, il n'en reste plus que {product.productQuantity} !
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center items-center mt-4">
        <div className="w-1/2 sm:h-20 lg:h-12 pr-2">
          <Button
            variant="contained"
            startIcon={<GiShoppingCart className="sm:text-6xl lg:text-4xl" />}
            className="sm:h-20 lg:h-12 sm:text-2xl lg:text-base bg-amber-300 text-primary font-raleway w-full"
            onClick={() => {
              dispatch(
                addItemToShoppingCart({
                  productId: product.productId,
                })
              );
            }}
          >
            Ajouter au panier
          </Button>
        </div>
        <div className="w-1/2 pl-2">
          <AnimatedButton
            text="Acheter"
            isLoading={false}
            handleClick={() => {
              dispatch(
                setOrderToBeMade({
                  ordererFirstName: "",
                  ordererLastName: "",
                  ordererEmail: "",
                  ordererPhoneNumber: "",
                  ordererCompleteAddress: "",
                  clientId: null,
                  neighborhoodId: 0,
                  lines: [
                    {
                      quantity: 1,
                      productId: product.productId,
                      orderId: 0,
                    } as CreateOrderLineDTO,
                  ],
                })
              );
              navigate("/finalize-order");
            }}
          />
        </div>
      </div>
      <div className="mt-5 min-h-96 w-full bg-gray-100 p-5">
        <h1 className="uppercase font-raleway sm:text-2xl lg:text-xl font-medium">
          Description
        </h1>
        <span className="pl-3 w-full font-light sm:text-xl lg:text-sm">
          {product.productDescription}
        </span>
      </div>
      <RateProductDialog
        product={product}
        open={openRateProductDialog}
        setOpen={setOpenRateProductDialog}
      />
    </div>
  );
};

export default DetailsSection;
