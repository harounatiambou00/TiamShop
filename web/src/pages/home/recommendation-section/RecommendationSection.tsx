import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

// import required modules
import { useNavigate } from "react-router-dom";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";

const RecommendationSection = () => {
  const navigate = useNavigate();
  let allProducts = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  ) as ProductAndRelatedInfo[];
  const [productsToBeDisplayed, setProductsToBeDisplayed] =
    React.useState<ProductAndRelatedInfo[]>(allProducts);

  React.useEffect(() => {
    setProductsToBeDisplayed(allProducts);
  }, [allProducts]);
  return (
    <HomePageSection
      title="Recommendations ( Unique comme vous )"
      handleClickSeeMoreButton={() => navigate("/recommendations")}
    >
      <HomepageProductsSwiper products={productsToBeDisplayed.slice(0, 10)} />
    </HomePageSection>
  );
};

export default RecommendationSection;
