import React from "react";
import { Button, Paper } from "@mui/material";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

type Props = {
  product: ProductAndRelatedInfo;
};

const DetailsSection = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-4 justify-start">
      <Paper
        elevation={2}
        className="col-span-4 sm:h-60 lg:h-44 sm:mt-10 lg:mt-0 sm:py-5 lg:py-2 sm:px-10 lg:px-5 flex items-center justify-between"
      >
        <div className="h-full flex flex-col">
          <div className="font-bold sm:text-5xl lg:text-3xl tracking-wide text-primary font-amita">
            {product.productPrice -
              (product.productDiscountPercentage * product.productPrice) /
                100}{" "}
            <span className="font-raleway font-medium">FCFA</span>
          </div>
          <span className="flex items-start mb-3">
            <span className="flex items-center text-red-600 line-through sm:text-4xl lg:text-2xl font-amita">
              {product.productPrice}
            </span>
            <span className="flex text-gray-400 sm:text-lg lg:text-xs ml-2">
              -10% jusqu'au{" "}
              {product.productDiscountEndDate?.toLocaleString().slice(0, 10)}
            </span>
          </span>

          {product.productPrice >= 500000 && (
            <span className="bg-green-200 px-3 rounded-full drop-shadow-sm sm:text-lg lg:text-xs  w-fit">
              Livraison gratuite
            </span>
          )}
          <span className="flex items-center mt-2 sm:text-lg lg:text-base">
            <AiOutlineStar className=" text-yellow-400 mr-2 sm:text-2xl lg:text-lg" />{" "}
            4.5 / 5
            <span className="flex items-center text-gray-400 font-raleway ml-2">
              1 000 ventes
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center justify-between w-4/12">
          <Button
            variant="contained"
            className="bg-secondary mb-3 font-raleway font-medium sm:h-16 lg:h-auto sm:w-80 lg:w-auto sm:text-xl lg:text-sm"
            startIcon={
              <MdOutlineAddShoppingCart className="sm:text-2xl lg:text-base" />
            }
          >
            Ajouter au panier
          </Button>
          <Button
            variant="outlined"
            className="font-raleway font-medium sm:h-16 lg:h-auto sm:w-80 lg:w-auto sm:text-xl lg:text-sm"
          >
            Acheter maintenant
          </Button>
          {product.productQuantity <= 20 && (
            <small className="text-red-600 font-light sm:text-lg lg:text-sm text-center">
              Ne manquez pas cette occasion il n'en reste que{" "}
              {product.productQuantity}.
            </small>
          )}
        </div>
      </Paper>
      <div className="sm:mt-10 lg:mt-0 w-full col-span-4">
        <span className="sm:text-2xl lg:text-xl font-raleway font-medium text-gray-700 w-full uppercase">
          Description
        </span>
        <div className="font-kanit sm:px-5 sm:pt-8 lg:px-2 lg:pt-3 mt-1 sm:text-xl lg:text-base">
          {product.productDescription}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
