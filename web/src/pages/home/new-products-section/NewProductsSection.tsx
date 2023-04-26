import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";
import { Skeleton } from "@mui/material";
import { Product } from "../../../data/models/Product";

const NewProductsSection = () => {
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    Product[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getProductsToBeDisplayed = async () => {
      setIsLoading(true);
      let url =
        process.env.REACT_APP_API_URL + "products/get-ten-newest-products";
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
  return (
    <HomePageSection title="Nouvel arrivage">
      {!isLoading ? (
        <HomepageProductsSwiper
          products={productsToBeDisplayed}
          newProducts={true}
        />
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

export default NewProductsSection;
