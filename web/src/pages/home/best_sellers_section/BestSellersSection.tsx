import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import HomepageProductsSwiper from "../../../components/homepage-components/homepage-sections-products-swiper/HomepageProductsSwiper";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

import { useNavigate } from "react-router-dom";

const BestSellersSection = () => {
  let products = [] as ProductAndRelatedInfo[];
  const navigate = useNavigate();
  return (
    <HomePageSection
      title="Les plus populaires cette semaine"
      handleClickSeeMoreButton={() => navigate("/best-sellers")}
    >
      <HomepageProductsSwiper
        products={products.slice(0, 10)}
        trendingProducts={true}
      />
    </HomePageSection>
  );
};

export default BestSellersSection;
