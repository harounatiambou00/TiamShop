import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
} from "@mui/material";
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  const brand = brands.find((b) => b.brandId === product.brandId);

  return (
    <Card className="w-full h-full">
      <CardActionArea
        className="h-10/12"
        onClick={() =>
          product && navigate("/product-details/" + product.productId)
        }
      >
        <div className="fixed top-1 right-1 flex flex-col">
          <IconButton size="small" color="primary">
            <AiOutlineHeart />
          </IconButton>
          <IconButton size="small" color="primary">
            <TbArrowsLeftRight />
          </IconButton>
        </div>
        {product &&
          product.productDiscountPercentage !== null &&
          product.productDiscountPercentage !== 0 && (
            <div className="fixed top-0 left-0 bg-red-400 px-2 drop-shadow-sm text-primary font-normal font-raleway">
              -{product.productDiscountPercentage}%
            </div>
          )}
        {isLoading || product === null ? (
          <Skeleton
            className="h-1/2 w-full"
            variant="rectangular"
            animation="wave"
          />
        ) : (
          <CardMedia
            component="img"
            className="h-1/2 px-16"
            image={
              "data:" +
              product.images[0].imageExtension +
              ";base64," +
              product.images[0].imageBytes
            }
            alt={product.productName}
          />
        )}
        {isLoading || !product || brand === undefined ? (
          <CardContent className="flex flex-col items-center">
            <Skeleton variant="text" className="w-10/12 h-10" />
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="text" className="w-1/4" />
            <div className="w-full flex justify-between px-2 items-center">
              <Skeleton variant="text" className="w-1/4" />
              <Skeleton variant="text" className="w-1/4" />
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col items-center">
            <h1 className="font-raleway text-base w-full px-1">
              {product.productName}
            </h1>
            <div className="flex items-center justify-between w-full px-2">
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
            <div className="w-full flex justify-between px-2 items-center">
              <small className="text-center">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= product.rating ? (
                    <AiFillStar className="text-yellow-500 inline" key={i} />
                  ) : (
                    <AiOutlineStar className="inline" key={i} />
                  )
                )}
                <span className="block">{product.numberOfVotes} votes</span>
              </small>
              <small className="text-center text-gray-500">1000 ventes</small>
            </div>
          </CardContent>
        )}
      </CardActionArea>
      {isLoading ? (
        <div className="flex justify-between w-full items-center">
          <Skeleton variant="rectangular" className="h-8 w-10/12" />
          <Skeleton variant="circular" className="h-8 w-8" />
        </div>
      ) : (
        <CardActions className="w-full px-2">
          <Button
            className="w-full bg-orange-300 font-raleway font-semibold text-primary"
            variant="contained"
            color="secondary"
          >
            Acheter
          </Button>
          <IconButton color="primary">
            <GiShoppingCart />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;
