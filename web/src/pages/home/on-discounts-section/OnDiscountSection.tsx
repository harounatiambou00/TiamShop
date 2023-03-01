import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { useNavigate } from "react-router-dom";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";

const OnDiscountSection = () => {
  let allProducts = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    ProductAndRelatedInfo[]
  >([]);
  React.useEffect(() => {
    setProductsToBeDisplayed(
      allProducts
        .filter(
          (p) =>
            p.productDiscountPercentage !== 0 &&
            p.productDiscountEndDate !== null
        )
        .sort((p1, p2) => {
          if (p1.productDiscountPercentage > p2.productDiscountPercentage)
            return -1;
          else if (p1.productDiscountPercentage < p2.productDiscountPercentage)
            return 1;
          else return 0;
        })
        .slice(0, 10)
    );
  }, [allProducts]);
  const navigate = useNavigate();
  return (
    <HomePageSection
      title="En solde"
      handleClickSeeMoreButton={() => navigate("/on-discount-products")}
    >
      <HomepageProductsSwiper products={productsToBeDisplayed.slice(0, 10)} />
    </HomePageSection>
  );
};

export default OnDiscountSection;
