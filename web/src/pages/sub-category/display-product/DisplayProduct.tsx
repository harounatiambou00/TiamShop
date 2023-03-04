import React from "react";
import { Product } from "../../../data/models/Product";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { Button, IconButton, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TbArrowsLeftRight, TbHeartPlus } from "react-icons/tb";
import { SubCategory } from "../../../data/models/SubCategory";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { AnimatedButton } from "../../../components/core";

type Props = {
  product: Product;
  subCategory: SubCategory;
};

const DisplayProduct = ({ product, subCategory }: Props) => {
  const brand = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ).find((b) => b.brandId === product.brandId);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [productAndRelatedInfos, setProductAndRelatedInfos] =
    React.useState<ProductAndRelatedInfo | null>(null);
  React.useEffect(() => {
    const getProductAndRelatedInfos = async () => {
      setIsLoading(true);
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-product-and-all-related-info/" +
        product.productId;
      let response = await fetch(url, {
        method: "GET",
      });
      let content = await response.json();
      if (content.success) {
        setProductAndRelatedInfos(content.data);
      } else console.log(content);
      setIsLoading(false);
    };
    getProductAndRelatedInfos();
  }, []);
  return (
    <div
      className="w-full flex sm:flex-col lg:flex-row justify-between cursor-pointer bg-white border-y-2 sm:py-4 lg:py-0"
      onClick={() => navigate("/product-details/" + product.productId)}
    >
      <div className="sm:w-full lg:w-1/4">
        {!isLoading ? (
          <div className="p-16 flex items-center justify-center bg-white relative">
            <img
              src={
                "data:" +
                productAndRelatedInfos?.images[0].imageExtension +
                ";base64," +
                productAndRelatedInfos?.images[0].imageBytes
              }
              alt={productAndRelatedInfos?.images[0].imageName}
              className="sm:max-h-96 lg:max-h-80"
            />
            <div className="sm:top-10 sm:right-10 lg:top-1 lg:right-1 flex flex-col z-50 absolute">
              <div className="flex flex-col items-center mb-2">
                <IconButton
                  className="hover:text-secondary"
                  size={window.innerWidth < 500 ? "large" : "medium"}
                >
                  <TbHeartPlus />
                </IconButton>
                <small className="font-normal text-gray-500">Mes listes</small>
              </div>
              <div className="flex flex-col items-center">
                <IconButton className="hover:text-secondary">
                  <TbArrowsLeftRight />
                </IconButton>
                <small className="font-normal text-gray-500">Comparer</small>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full px-5 py-2">
            <Skeleton
              variant="rectangular"
              className="w-full h-60 rounded-lg"
              animation="pulse"
            />
          </div>
        )}
      </div>
      <div className="sm:w-full lg:w-2/4 pt-3 px-5">
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-3/4 h-7 mb-4 rounded-md"
          />
        ) : (
          <h1 className="font-raleway uppercase font-medium sm:text-2xl lg:text-base">
            {product.productName}
          </h1>
        )}
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-2/4 h-6 rounded-md"
          />
        ) : (
          <div className="flex items-end">
            <span className="sm:text-lg lg:text-sm font-normal text-gray-500">
              {subCategory.SubCategoryTitle} - {brand && brand.BrandName}{" "}
            </span>
            <span className="sm:text-xl lg:text-sm">
              {productAndRelatedInfos?.rating !== undefined && (
                <span className="ml-3">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= productAndRelatedInfos?.rating ? (
                      <AiFillStar className="text-yellow-500 inline" key={i} />
                    ) : (
                      <AiOutlineStar className="inline" key={i} />
                    )
                  )}
                  <span className="ml-1">
                    ({productAndRelatedInfos.numberOfVotes})
                  </span>
                </span>
              )}
            </span>
          </div>
        )}
        {isLoading ? (
          <div className="mt-4 flex items-center">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-1/4 h-5 rounded-md drop-shadow-xl mr-10"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="w-1/4 h-5 rounded-md drop-shadow-xl"
            />
          </div>
        ) : (
          <div className="mt-2">
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
        )}
        {isLoading ? (
          /*Hidden on large screens */
          <Skeleton
            className="w-10/12 rounded-full sm:mt-3 lg:mt-0 mb-2 h-10 lg:hidden sm:block"
            animation="wave"
          />
        ) : (
          /*Hidden on large screens */
          <div className="w-full sm:mt-3 lg:mt-0 lg:hidden sm:flex items-center">
            {productAndRelatedInfos !== null &&
              (isLoading ? (
                <Skeleton />
              ) : (
                <h1 className="font-amita sm:text-4xl lg:text-xl font-medium text-primary mr-2">
                  {productAndRelatedInfos.productPrice -
                    productAndRelatedInfos.productPrice *
                      (productAndRelatedInfos.productDiscountPercentage /
                        100)}{" "}
                  <span className="font-raleway">FCFA</span>
                </h1>
              ))}
            {productAndRelatedInfos !== null &&
              productAndRelatedInfos.productDiscountPercentage !== 0 &&
              (isLoading ? (
                <Skeleton />
              ) : (
                <h1 className="sm:text-2xl lg:text-xl text-red-700 line-through">
                  {productAndRelatedInfos.productPrice} FCFA
                </h1>
              ))}
          </div>
        )}
        {isLoading ? (
          /*Hidden on large screens */
          <Skeleton
            variant="rectangular"
            className="w-32 mb-2 rounded-full lg:hidden sm:block"
            animation="wave"
          />
        ) : (
          productAndRelatedInfos !== null &&
          productAndRelatedInfos.productDiscountPercentage !== 0 && (
            /*Hidden on large screens */
            <small className="lg:hidden sm:block text-red-700 bg-red-100 first-letter:uppercase px-4 rounded-full mb-5 w-fit sm:text-xl lg:text-sm font-normal drop-shadow-sm">
              économisez {productAndRelatedInfos.productDiscountPercentage}%
            </small>
          )
        )}

        {!isLoading && (
          <div className="w-full min-h-40 border-2 my-5 flex">
            <div className="w-1/2 border-r-2 h-full p-3">
              {productAndRelatedInfos?.caracteristics.slice(0, 4).map((i) => (
                <div
                  key={i.productCaracteristicId}
                  className="w-full flex items-center mb-2"
                >
                  <small className="font-normal sm:text-lg lg:text-xs text-gray-500 font-kanit mr-10 w-1/2">
                    {i.productCaracteristicKey}
                  </small>
                  <span className="font-normal sm:text-lg lg:text-xs font-kanit mr-10 w-1/2">
                    {i.productCaracteristicValue.length > 100
                      ? i.productCaracteristicValue.slice(0, 100)
                      : i.productCaracteristicValue}
                    {i.productCaracteristicValue.length > 100 && (
                      <span className="text-sm">...</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-1/2 h-full p-3">
              {productAndRelatedInfos?.caracteristics.slice(5, 10).map((i) => (
                <div
                  key={i.productCaracteristicId}
                  className="w-full flex items-center mb-2"
                >
                  <small className="font-normal sm:text-lg lg:text-xs text-gray-500 font-kanit mr-10 w-1/2">
                    {i.productCaracteristicKey}
                  </small>
                  <span className="font-normal sm:text-lg lg:text-xs font-kanit mr-10 w-1/2">
                    {i.productCaracteristicValue.length > 100
                      ? i.productCaracteristicValue.slice(0, 100)
                      : i.productCaracteristicValue}
                    {i.productCaracteristicValue.length > 100 && (
                      <span className="text-sm">...</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="sm:w-full lg:w-1/4 px-5 flex flex-col justify-center">
        {isLoading ? (
          /*Hidden on small screens */
          <Skeleton
            className="w-10/12 rounded-full mb-2 h-10 sm:hidden lg:block"
            animation="wave"
          />
        ) : (
          /*Hidden on small screens */
          <div className="w-full sm:hidden lg:flex items-center">
            {productAndRelatedInfos !== null &&
              (isLoading ? (
                <Skeleton />
              ) : (
                <h1 className="font-amita text-xl font-medium text-primary mr-2">
                  {productAndRelatedInfos.productPrice -
                    productAndRelatedInfos.productPrice *
                      (productAndRelatedInfos.productDiscountPercentage /
                        100)}{" "}
                  <span className="font-raleway">FCFA</span>
                </h1>
              ))}
            {productAndRelatedInfos !== null &&
              productAndRelatedInfos.productDiscountPercentage !== 0 &&
              (isLoading ? (
                <Skeleton />
              ) : (
                <h1 className="text-md text-red-700 line-through">
                  {productAndRelatedInfos.productPrice} FCFA
                </h1>
              ))}
          </div>
        )}
        {isLoading ? (
          /*Hidden on small screens */
          <Skeleton
            variant="rectangular"
            className="w-32 mb-2 rounded-full sm:hidden lg:block"
            animation="wave"
          />
        ) : (
          productAndRelatedInfos !== null &&
          productAndRelatedInfos.productDiscountPercentage !== 0 && (
            /*Hidden on small screens */
            <small className="sm:hidden lg:block text-red-700 bg-red-100 first-letter:uppercase px-4 rounded-full mb-5 w-fit text-sm font-normal drop-shadow-sm">
              économisez {productAndRelatedInfos.productDiscountPercentage}%
            </small>
          )
        )}
        <div className="w-full flex sm:flex-row lg:flex-col">
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              className="sm:h-20 lg:h-12 rounded-md"
              animation="wave"
            />
          ) : (
            <Button
              variant="contained"
              startIcon={<GiShoppingCart className="sm:text-6xl lg:text-4xl" />}
              className="sm:h-20 lg:h-12 sm:text-2xl lg:text-base bg-amber-300 text-primary font-raleway w-full"
            >
              Ajouter au panier
            </Button>
          )}
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              className="sm:h-20 lg:h-12 rounded-md sm:mt-0 lg:mt-3"
              animation="wave"
            />
          ) : (
            <div className="w-full sm:mt-0 lg:mt-3 sm:ml-3 lg:ml-0">
              <AnimatedButton text="Acheter" isLoading={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
