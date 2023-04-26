import { Skeleton } from "@mui/material";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";
import { Product } from "../../../data/models/Product";

import { useNavigate } from "react-router-dom";
import React from "react";

const BestSellersSection = () => {
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    Product[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getProductsToBeDisplayed = async () => {
      setIsLoading(true);
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-best-sellers-products?limit=10";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        setProductsToBeDisplayed([]);
        for (let i of content.data) {
          setProductsToBeDisplayed((current) => [
            ...current,
            {
              productId: i.productId,
              productReference: i.productReference,
              productName: i.productName,
              productDescription: i.productDescription,
              productPrice: i.productPrice,
              productQuantity: i.productQuantity,
              createdAt:
                i.createdAt !== null && typeof i.createdAt === "string"
                  ? new Date(
                      parseInt(i.createdAt.slice(0, 4)),
                      parseInt(i.createdAt.slice(5, 7)) - 1,
                      parseInt(i.createdAt.slice(8, 10))
                    )
                  : null,
              waranty: i.waranty,
              color: i.color,
              productPrincipalImageId: i.productPrincipalImageId,
              brandId: i.brandId,
              subCategoryId: i.subCategoryId,
              productDiscountId: i.productDiscountId,
            },
          ]);
        }
      }
      setIsLoading(false);
    };
    getProductsToBeDisplayed();
  }, []);

  const navigate = useNavigate();
  return (
    <HomePageSection
      title="Tendances"
      handleClickSeeMoreButton={() => navigate("/best-sellers")}
    >
      {!isLoading ? (
        <HomepageProductsSwiper products={productsToBeDisplayed} />
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="h-80 w-full rounded-md mt-5"
        />
      )}
    </HomePageSection>
  );
};

export default BestSellersSection;
