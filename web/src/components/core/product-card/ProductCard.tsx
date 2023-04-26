import React from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { FiTrendingUp } from "react-icons/fi";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { addItemToShoppingCart } from "../../../redux/slices/shoppingCartSlice";
import SuccessSnackbar from "../suucess-snackbar/SuccessSnackbar";
import { setOrderToBeMade } from "../../../redux/slices/orderToBeMadeSlice";
import CreateOrderLineDTO from "../../../data/models/CreateOrderLineDTO";
import { Product } from "../../../data/models/Product";

type Props = {
  product: Product;
  isTrend?: boolean;
  isNew?: boolean;
};

const ProductCard = ({ product, isTrend, isNew }: Props) => {
  const navigate = useNavigate();
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  const brand = brands.find((b) => b.brandId === product.brandId);
  const dispatch = useAppDispatch();
  const [openProductAddedToCartSnackbar, setOpenPoductAddedToCartSnackbar] =
    React.useState<boolean>(false);

  const [productAndRelatedInfos, setProductAndRelatedInfo] = React.useState<
    ProductAndRelatedInfo | undefined
  >(undefined);

  const getProductAdRelatedInfos = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "products/get-product-and-all-related-info/" +
      product.productId;
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
    }
  };

  React.useEffect(() => {
    getProductAdRelatedInfos();
  }, []);

  return (
    <Card className="w-full min-h-full relative flex flex-col justify-between">
      <div className="absolute sm:top-4 sm:right-2 lg:top-1 lg:right-1 flex flex-col z-50">
        <IconButton size="small" color="primary">
          <AiOutlineHeart className="sm:text-4xl lg:text-xl" />
        </IconButton>
        <IconButton size="small" color="primary">
          <TbArrowsLeftRight className="sm:text-4xl lg:text-xl" />
        </IconButton>
      </div>
      <CardActionArea
        className="z-40"
        onClick={() => navigate("/product-details/" + product.productId)}
      >
        {productAndRelatedInfos !== undefined &&
          productAndRelatedInfos.productDiscountPercentage !== null &&
          productAndRelatedInfos.productDiscountPercentage !== 0 && (
            <div className="absolute top-0 left-0 bg-red-400 sm:px-4 lg:px-2 drop-shadow-sm text-primary sm:text-2xl lg:text-base font-normal font-raleway">
              Economisez {productAndRelatedInfos.productDiscountPercentage}%
            </div>
          )}
        {productAndRelatedInfos ? (
          <CardMedia
            component="img"
            className="w-full px-16 pt-5"
            image={
              "data:" +
              productAndRelatedInfos.images[0].imageExtension +
              ";base64," +
              productAndRelatedInfos.images[0].imageBytes
            }
            alt={productAndRelatedInfos.productName}
          />
        ) : (
          <CardMedia>
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-full h-60"
            />
          </CardMedia>
        )}
        <CardContent className="flex flex-col items-center sm:mt-5 lg:mt-4">
          <h1 className="font-raleway font-medium sm:text-2xl lg:text-base w-full sm:px-3 lg:px-1 text-center">
            {product.productName}
          </h1>
          <div className="flex items-center justify-between sm:text-2xl lg:text-base w-full sm:px-3 lg:px-1 sm:mt-2 lg:mt-1">
            {productAndRelatedInfos && (
              <p>
                {product.productPrice -
                  productAndRelatedInfos.productDiscountPercentage *
                    (product.productPrice / 100)}{" "}
                FCFA
              </p>
            )}
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
              {productAndRelatedInfos !== undefined ? (
                <Rating
                  className="sm:text-3xl lg:text-base"
                  size="small"
                  value={productAndRelatedInfos?.rating}
                  readOnly
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  className="rounded-full w-24 h-4 mb-2"
                />
              )}

              {productAndRelatedInfos !== undefined ? (
                <span className="block sm:text-xl lg:text-sm">
                  {productAndRelatedInfos.numberOfVotes} votes
                </span>
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  className="rounded-full w-20 h-3"
                />
              )}
            </small>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className="w-full flex items-center justify-between sm:px-5 lg:px-2 sm:pb-8 lg:pb-4">
        <Button
          className="sm:w-10/12 lg:w-10/12 bg-amber-400 font-raleway font-semibold text-primary sm:text-3xl lg:text-base"
          variant="contained"
          color="secondary"
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
        >
          Acheter
        </Button>
        <IconButton
          color="primary"
          onClick={() => {
            dispatch(
              addItemToShoppingCart({
                productId: product.productId,
                setOpenSuccessSnackbar: setOpenPoductAddedToCartSnackbar,
              })
            );
          }}
        >
          <GiShoppingCart className="sm:text-5xl lg:text-2xl" />
        </IconButton>
      </CardActions>
      <SuccessSnackbar
        open={openProductAddedToCartSnackbar}
        setOpen={setOpenPoductAddedToCartSnackbar}
        text={
          "Vous avez ajouté l'article '" +
          product.productName +
          "' à votre panier."
        }
      />
    </Card>
  );
};

export default ProductCard;
