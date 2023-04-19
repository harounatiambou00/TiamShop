import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";

const NewProductsSection = () => {
  let allProducts = [] as ProductAndRelatedInfo[];
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    ProductAndRelatedInfo[]
  >([]);
  React.useEffect(() => {
    setProductsToBeDisplayed(
      allProducts
        .filter((p) => p.createdAt !== null && typeof p.createdAt === "string")
        .sort((p1, p2) => {
          if (p1.createdAt !== null && p2.createdAt !== null) {
            if (new Date(p1.createdAt) > new Date(p2.createdAt)) return -1;
            else if (new Date(p1.createdAt) < new Date(p2.createdAt)) return 1;
            else return 0;
          } else return 0;
        })
        .slice(0, 9)
    );
  }, [allProducts]);
  return (
    <HomePageSection title="Nouvel arrivage">
      <HomepageProductsSwiper
        products={productsToBeDisplayed}
        newProducts={true}
      />
    </HomePageSection>
  );
};

export default NewProductsSection;
