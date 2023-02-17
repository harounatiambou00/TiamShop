import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ProductDetailsBreadcumb from "./product-details-breadcumb/ProductDetailsBreadcumb";
import ProductDetailsImagesSection from "./product-details-images-section/ProductDetailsImagesSection";
import ProductAndRelatedInfo from "../../data/models/ProductAndRelatedInfo";
import ProductCaracteristics from "./product-caracteristics/ProductCaracteristics";

const DetailsSection = React.lazy(
  () => import("./details-section/DetailsSection")
);
const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

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
        productId;
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
        navigate("*");
      }
    };

    if (!productId || productId.length !== 36) navigate("/");
    //Getting the product
    else {
      setIsLoading(true);
      getProductAndRelatedInfo();
      setIsLoading(false);
    }
  }, []);

  return !isLoading ? (
    <div className=" w-full p-5">
      <ProductDetailsBreadcumb product={productAndRelatedInfo} />
      <h1 className="mt-4 sm:text-4xl lg:text-2xl font-medium font-raleway">
        {productAndRelatedInfo.productName}
      </h1>
      <div className="sm:text-2xl lg:text-base tracking-wide">
        Référence :{" "}
        <span className="font-medium text-gray-700 tracking-wide">
          {productAndRelatedInfo.productReference}
        </span>
      </div>
      <div className="sm:mt-10 lg:mt-6 grid sm:grid-cols-1 lg:grid-cols-2 gap-1 w-full bg-white">
        <ProductDetailsImagesSection images={productAndRelatedInfo.images} />
        <Suspense fallback={<div>loading ...</div>}>
          <DetailsSection product={productAndRelatedInfo} />
        </Suspense>
      </div>
      <div>
        <ProductCaracteristics
          caracteristics={productAndRelatedInfo.caracteristics}
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default ProductDetailsPage;
