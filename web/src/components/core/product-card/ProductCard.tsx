import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { FiTrendingUp } from "react-icons/fi";

type Props = {
  product: ProductAndRelatedInfo;
  isTrend?: boolean;
  isNew?: boolean;
};

const ProductCard = ({ product, isTrend, isNew }: Props) => {
  const navigate = useNavigate();
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  const brand = brands.find((b) => b.brandId === product.brandId);

  return (
    <Card className="w-full relative flex flex-col justify-between">
      <div className="absolute sm:top-4 sm:right-2 lg:top-1 lg:right-1 flex flex-col z-50">
        <IconButton size="small" color="primary">
          <AiOutlineHeart className="sm:text-4xl lg:text-xl" />
        </IconButton>
        <IconButton size="small" color="primary">
          <TbArrowsLeftRight className="sm:text-4xl lg:text-xl" />
        </IconButton>
      </div>
      <CardActionArea
        className="z-40 pt-5"
        onClick={() =>
          product && navigate("/product-details/" + product.productId)
        }
      >
        {product &&
          product.productDiscountPercentage !== null &&
          product.productDiscountPercentage !== 0 && (
            <div className="absolute top-0 left-0 bg-red-400 sm:px-4 lg:px-2 drop-shadow-sm text-primary sm:text-2xl lg:text-base font-normal font-raleway">
              Economisez {product.productDiscountPercentage}%
            </div>
          )}
        <CardMedia
          component="img"
          className="w-full px-16"
          image={
            "data:" +
            product.images[0].imageExtension +
            ";base64," +
            product.images[0].imageBytes
          }
          alt={product.productName}
        />
        <CardContent className="flex flex-col items-center sm:mt-5 lg:mt-4">
          <h1 className="font-raleway font-medium sm:text-2xl lg:text-base w-full sm:px-3 lg:px-1 text-center">
            {product.productName}
          </h1>
          <div className="flex items-center justify-between sm:text-2xl lg:text-base w-full sm:px-3 lg:px-1 sm:mt-2 lg:mt-1">
            <p>
              {product.productPrice -
                product.productDiscountPercentage *
                  (product.productPrice / 100)}{" "}
              FCFA
            </p>
            {brand !== undefined && <small>{brand.BrandName}</small>}
          </div>
          <div className="flex items-center justify-center">
            {isTrend !== undefined && isTrend === true && (
              <div className="px-2 py-1 bg-teal-100 text-teal-800 w-fit rounded-xl drop-shadow-sm mr-4">
                <FiTrendingUp />
              </div>
            )}
            {isNew !== undefined && isNew === true && (
              <div className="px-2 py-1 bg-red-100 text-red-800 w-fit rounded-xl drop-shadow-sm text-xs">
                Nouveau
              </div>
            )}
          </div>
          <div className="w-full flex justify-between sm:px-3 lg:px-1 items-center sm:mt-1 lg:mt-0">
            <small className="text-center">
              <Rating
                className="sm:text-3xl lg:text-base"
                size="small"
                value={product.rating}
                readOnly
              />
              <span className="block sm:text-xl lg:text-sm">
                {product.numberOfVotes} votes
              </span>
            </small>
            <small className="text-center text-gray-500 sm:text-xl lg:text-sm">
              1000 ventes
            </small>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className="w-full flex items-center justify-between sm:px-5 lg:px-2 sm:pb-8 lg:pb-4">
        <Button
          className="sm:w-10/12 lg:w-10/12 bg-orange-300 font-raleway font-semibold text-primary sm:text-3xl lg:text-base"
          variant="contained"
          color="secondary"
        >
          Acheter
        </Button>
        <IconButton color="primary">
          <GiShoppingCart className="sm:text-5xl lg:text-2xl" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
