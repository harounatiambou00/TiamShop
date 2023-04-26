import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

// import required modules
import { useNavigate } from "react-router-dom";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";
import { Product } from "../../../data/models/Product";

const RecommendationSection = () => {
  const navigate = useNavigate();
  let allProducts = [] as Product[];
  const [productsToBeDisplayed, setProductsToBeDisplayed] =
    React.useState<Product[]>(allProducts);

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
